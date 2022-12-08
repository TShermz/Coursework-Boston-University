function Transaction (sequelize, Sequelize) {
	const Transaction = sequelize.define('transaction', {
		transId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING
		},
		type: {
			type: Sequelize.STRING
		},
		price: {
			type: Sequelize.INTEGER
		},
		quantity: {
			type: Sequelize.INTEGER
		}
	},{updatedAt: false}
	);
	
	return Transaction;
}

export default Transaction;

