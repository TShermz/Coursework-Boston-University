import controller from '../controller/runeLogger.js';

const {create, findAll, findById, update, deleteById } = controller;

export default (app) => {
 
    // Create a new Transaction
    app.post('/api/', create);

    // Retrieve all Items
    app.get('/api/', findAll);

    // Retrieve all Transactions by Name
    app.get('/api/transactions/:name', findAll);
 
    // Retrieve a Transaction by Name and ID 
    app.get('/api/transactions/:name/:transId', findById);
 
    // Update an Item by Name
    app.put('/api/transactions', update);
 
    // Delete a Transaction with Id
    app.delete('/api/transactions/:name/:transId', deleteById);
}