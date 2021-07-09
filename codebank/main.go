package main

import (
	"database/sql"
	"fmt"

	"github.com/diasjuniorr/code-commerce/codebank/infrastructure/kafka"
	"github.com/diasjuniorr/code-commerce/codebank/infrastructure/repository"
	"github.com/diasjuniorr/code-commerce/codebank/usecase"
	_ "github.com/lib/pq"
)

func main() {
	db := setupDb()
	defer db.Close()
}

func setupTransactionUseCase(db *sql.DB) usecase.UseCaseTransaction {
	transactionRepository := repository.NewTransactionRepositoryDb(db)
	kafkaProducer := kafka.NewKafkaProducer()
	useCase := usecase.NewUseCaseTransaction(transactionRepository, kafkaProducer)
	return useCase
}
func setupDb() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disabled",
		"db",
		"5432",
		"postgres",
		"root",
		"codebank",
	)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	return db
}
