import env from "./env.js";
import { Sequelize } from 'sequelize';
import Transaction from '../model/transaction.model.js';
import Item from "../model/item.model.js";

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.items = Item(sequelize, Sequelize);
db.transactions = Transaction(sequelize, Sequelize);

export default db;