package main

import (
	"database/sql"
	"fmt"

	"github.com/diasjuniorr/code-commerce/codebank/infrastructure/kafka"
	"github.com/diasjuniorr/code-commerce/codebank/infrastructure/repository"
	"github.com/diasjuniorr/code-commerce/codebank/infrastructure/server"
	"github.com/diasjuniorr/code-commerce/codebank/usecase"
	_ "github.com/lib/pq"
)

func main() {
	db := setupDb()
	defer db.Close()

	producer := setupKafkaProducer()
	processTransactionUSeCase := setupTransactionUseCase(db, producer)
	fmt.Printf("codebank server running and listen on port 50052")
	serveGrpc(processTransactionUSeCase)

}

func setupTransactionUseCase(db *sql.DB, producer kafka.KafkaProducer) usecase.UseCaseTransaction {
	transactionRepository := repository.NewTransactionRepositoryDb(db)
	useCase := usecase.NewUseCaseTransaction(transactionRepository)
	useCase.KafkaProducer = &producer
	return useCase
}
func setupDb() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
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

func setupKafkaProducer() kafka.KafkaProducer {
	kafkaProducer := kafka.NewKafkaProducer()
	kafkaProducer.SetProducer("host.docker.internal:9094")
	return kafkaProducer
}

func serveGrpc(processTransactionUseCase usecase.UseCaseTransaction) {
	grpcServer := server.NewGRPCServer()
	grpcServer.ProcessTransactionUseCase = processTransactionUseCase
	grpcServer.Serve()
}
