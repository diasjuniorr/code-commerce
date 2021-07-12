package usecase

import (
	"encoding/json"
	"log"
	"time"

	"github.com/diasjuniorr/code-commerce/codebank/domain"
	"github.com/diasjuniorr/code-commerce/codebank/dto"
	"github.com/diasjuniorr/code-commerce/codebank/infrastructure/kafka"
)

type UseCaseTransaction struct {
	transactionRepository domain.TransactionRepository
	KafkaProducer         *kafka.KafkaProducer
}

func NewUseCaseTransaction(transactionRepository domain.TransactionRepository) UseCaseTransaction {
	return UseCaseTransaction{transactionRepository: transactionRepository}
}

func (u *UseCaseTransaction) ProcessTransaction(transactionDto dto.Transaction) (domain.Transaction, error) {
	creditCard := u.hydrateCreditCard(transactionDto)

	ccBalanceAndLimit, err := u.transactionRepository.GetCreditCard(*creditCard)
	if err != nil {
		return domain.Transaction{}, err
	}

	creditCard.ID = ccBalanceAndLimit.ID
	creditCard.Limit = ccBalanceAndLimit.Limit
	creditCard.Balance = ccBalanceAndLimit.Balance

	t := u.newTransaction(transactionDto, *creditCard)
	t.ProcessAndValidate(creditCard)
	err = u.transactionRepository.SaveTransaction(*t, *creditCard)
	if err != nil {
		return domain.Transaction{}, err
	}

	transactionDto.ID = t.ID
	transactionDto.CreatedAt = t.CreatedAt
	transactionJson, err := json.Marshal(transactionDto)
	if err != nil {
		return domain.Transaction{}, err
	}

	err = u.KafkaProducer.Publish(string(transactionJson), "payments")
	if err != nil {
		//TODO rollback transaction
		log.Printf("kafka producer failed to publish transaction: %v", err)
	}

	return *t, nil
}

func (u *UseCaseTransaction) hydrateCreditCard(transactionDto dto.Transaction) *domain.CreditCard {
	creditCard := domain.NewCreditCard()
	creditCard.Name = transactionDto.Name
	creditCard.Number = transactionDto.Number
	creditCard.ExpirationMonth = transactionDto.ExpirationMonth
	creditCard.ExpirationYear = transactionDto.ExpirationYear
	creditCard.CVV = transactionDto.CVV
	return creditCard
}

func (u *UseCaseTransaction) newTransaction(transactionDto dto.Transaction, cc domain.CreditCard) *domain.Transaction {
	t := domain.NewTransaction()
	t.Amount = transactionDto.Amount
	t.Description = transactionDto.Description
	t.Store = transactionDto.Store
	t.CreatedAt = time.Now()
	t.CreditCardID = cc.ID
	return t
}
