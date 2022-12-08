function Item (sequelize, Sequelize) {
	const Item = sequelize.define('item', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING
		},
		totalPurchased: {
			type: Sequelize.INTEGER
		},
		totalSold: {
			type: Sequelize.INTEGER
		},
		totalTransactions: {
			type: Sequelize.INTEGER
		},
		profit: {
			type: Sequelize.INTEGER
		},
	},{timestamps: false}
	);
	
	return Item;
}

export default Item;

