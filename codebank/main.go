package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/diasjuniorr/code-commerce/codebank/infrastructure/kafka"
	"github.com/diasjuniorr/code-commerce/codebank/infrastructure/repository"
	"github.com/diasjuniorr/code-commerce/codebank/infrastructure/server"
	"github.com/diasjuniorr/code-commerce/codebank/usecase"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}
}

func main() {
	db := setupDb()
	defer db.Close()

	producer := setupKafkaProducer()
	processTransactionUSeCase := setupTransactionUseCase(db, producer)
	fmt.Println("codebank server running and listen on port 50052")
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
		os.Getenv("host"),
		os.Getenv("port"),
		os.Getenv("user"),
		os.Getenv("password"),
		os.Getenv("dbname"),
	)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	return db
}

func setupKafkaProducer() kafka.KafkaProducer {
	kafkaProducer := kafka.NewKafkaProducer()
	kafkaProducer.SetProducer(os.Getenv("KafkaBootstrapServers"))
	return kafkaProducer
}

func serveGrpc(processTransactionUseCase usecase.UseCaseTransaction) {
	grpcServer := server.NewGRPCServer()
	grpcServer.ProcessTransactionUseCase = processTransactionUseCase
	grpcServer.Serve()
}
