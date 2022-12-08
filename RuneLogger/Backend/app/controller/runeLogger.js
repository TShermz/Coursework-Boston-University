import db from '../config/db.config.js';

const Transaction = db.transactions;
const Item = db.items;
const sequelize = db.sequelize;

//Creates relationship between Item and Transaction Tables w/ Sequelize
Item.hasMany(Transaction, {onDelete: 'CASCADE'});
Transaction.belongsTo(Item, {onDelete: 'CASCADE'});

// Post a Transaction
function create (req, res) {	
	let submission = req.body, item, transaction;
	
	sequelize.sync({alter: true}).then(() => {
		//Find item associated with the name of the new transaction
		return Item.findOne({where: {name: submission.name}});
	}).then((existingItem) => {
		//If null, new item is created. Else, existing item's stats updated w/ new transaction
		if (existingItem === null){
			return newItem(submission);
		} else {
			updateItem(submission, existingItem);
			return existingItem;
		}
	}).then((data) => {
		//Store item object; create new transaction in database
		item = data;
		return Transaction.create(submission);
	}).then((result) => {
		//Return new transaction to client
		res.json(result);

		//Establish relationship between item and new transaction
		transaction = result;
		transaction.setItem(item);
	}).catch ((err) => {
		console.log(err);
	});
}

//Private function: Creates new item in MySQL databse if one does not exist already
function newItem(submission){
	let item, tPurchased, tSold, profit;

	//Assigns quantity to appropriate Sold/Purchased column
	if (submission.type === "purchase"){
		tPurchased = submission.quantity;
		tSold = 0;
		profit = (submission.quantity*submission.price)*-1;

	} else {
		tPurchased = 0;
		tSold = submission.quantity;
		profit = submission.quantity*submission.price
	}

	item = Item.create({
		name: submission.name,
		totalPurchased: tPurchased,
		totalSold: tSold,
		totalTransactions: 1,
		profit: profit
	}).then (() => {
		return Item.findOne({where: {name: submission.name}});
	}).catch((err) => {
		console.log(err);
	});
	return item;
}

//Private Function: Updates item stats for each new/deleted transaction
function updateItem(transaction, item){
	let transactionCount = 1;
	let profit, totalPurchased, totalSold;

	if(transaction.type === "purchase"){
		totalPurchased = transaction.quantity;
		totalSold = 0;
		profit = (transaction.quantity*transaction.price)*-1;
	} else if (transaction.type === "sale"){
		totalPurchased = 0;
		totalSold = transaction.quantity;
		profit = transaction.quantity*transaction.price;
	} else { //Use cases for deleting items
		//Removes one from total transactions
		transactionCount = -1;
		
		if (transaction.type === "deletepurchase"){
			//Removes from item purchased quantity; adds back profit from purchase
			totalPurchased = (transaction.quantity)*-1;
			totalSold = 0;
			profit = transaction.quantity*transaction.price;
		} else {
			//Removes from item sold quantity; removes profit from sale
			totalPurchased = 0;
			totalSold = (transaction.quantity)*-1;
			profit = (transaction.quantity*transaction.price)*-1;
		}
		
	}

	item.totalTransactions += transactionCount;
	item.totalPurchased += totalPurchased;
	item.totalSold += totalSold;
	item.profit += profit;
	console.log("SAVED PROFIT: " + item.profit);
	
	Item.update({
		totalPurchased: item.totalPurchased,
		totalSold: item.totalSold,
		totalTransactions: item.totalTransactions,
		profit: item.profit
	}, 
	{where: {id: item.id}
	}).then(() => {
		console.log("Success");
	}).catch((err) => {
		console.log(err);
	});
}

// Fetch all Items
function findAll (req, res) {
	//Gets all transactions by id (/transactions/:id)
	let name = req.params.name;
	if (typeof name === "string"){
		name = name.replace('_', ' ');
		Transaction.findAll({where: {name: name}}).then(transactions => {
			// Send all transactions with ID to Client
			res.json(transactions);
			});

	//Gets all items (/)
	} else {
		Item.findAll().then(items => {
			// Send all items to Client
			res.json(items);
			});
	} 
};

// Find a Transaction by Id
function findById (req, res) {
	Transaction.findById(req.params.transId).then(transaction => {
		res.json(transaction);
	}).catch((err) => {
		console.log(err);
	})
};

// Update a Transaction
function update (req, res)  {
	let transaction = req.body;
	let id = req.body.transId;
	Transaction.update(transaction, 
					{ where: {transId: id} }
				).then(() => {
						res.status(200).json({msg:"updated successfully a transaction with id = " + id});
				}).catch((err) => res.status(40).json({msg: err}));
};

// Delete a Transaction by Id
function deleteById  (req, res) {
	const id = req.params.transId;
	let item, transaction;

	Transaction.findOne({where: {transId: id}}).then((data) => {
		//stores transaction that is being deleted
		transaction = data;
		return Item.findOne({where: {name: transaction.name}});
	}).then((data) => {
		//stores parent item of transaction being deleted; updates item
		item = data;
		transaction.type = "delete"+ transaction.type;
		updateItem(transaction, item);
	}).then(() => {
		//once item is updated, child transaction is deleted
		Transaction.destroy({where: { transId: id }})
	}).then(() => {
		res.status(200).json({
			msg:'deleted successfully a transaction with id = ' + id
	});
	});
};

export default { create, findAll, findById, update, deleteById};