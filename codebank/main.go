package main

import (
	"database/sql"
	"fmt"

	"github.com/diasjuniorr/codebank/infrastructure/repository"
	"github.com/diasjuniorr/codebank/usecase"
	_ "github.com/lib/pg"
)

func main() {
	db := setupDb()
	defer db.Close()
}

func setupTransactionUseCase(db *sql.DB) usecase.UseCaseTransaction {
	transactionRepository := repository.NewTransactionRepositoryDb(db)
	useCase := usecase.NewUseCaseTransaction(transactionRepository)
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
