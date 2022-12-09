import { Transaction } from './interfaces/transaction';
export const TRANSACTIONS: Transaction[] = [
	{
		"type": "purchase",
		"date": "2021/01/10",
		"name": "Zarosian essence",
		"price": 276000,
		"quantity": 15,
		"total": 4140000
	},
	{
		"type": "purchase",
		"date": "2021/01/12",
		"name": "Super Energy (3)",
		"price": 4300,
		"quantity": 10000,
		"total": 43000000
	},
	{
		"type": "sale",
		"date": "2021/02/01",
		"name": "Zarosian essence",
		"price": 300000,
		"quantity": 15,
		"total": 4500000
	},
	{
		"type": "sale",
		"date": "2021/02/12",
		"name": "Super Energy (3)",
		"price": 9500,
		"quantity": 6500,
		"total": 61750000
	}

]