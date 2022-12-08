import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './app/config/db.config.js';
import routes from './app/route/runeLogger.route.js';

var app = express();
app.use(bodyParser.json())

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

  
// force: true will drop the table if it already exists
await db.sequelize.sync({alter: true});

//Instantiate routes
routes(app);
 
// Create a Server
var server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port

  console.log("App listening at http://%s:%s", host, port);
})