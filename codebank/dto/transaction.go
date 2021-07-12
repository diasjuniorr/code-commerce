package dto

import "time"

type Transaction struct {
	ID              string    `json:"Transaction_id"`
	Name            string    `json:"Name"`
	Number          string    `json:"-"`
	ExpirationMonth int32     `json:"-"`
	ExpirationYear  int32     `json:"-"`
	CVV             int32     `json:"-"`
	Amount          float64   `json:"Amount"`
	Store           string    `json:"Store"`
	Description     string    `json:"Description"`
	CreatedAt       time.Time `json:"Created_at"`
}
