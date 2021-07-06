
import('express-async-errors');
const express = require('express');
const app = express();

//const mongoose = import('mongoose');
const config = import('config');
const logger = require('./middleware/logger.js');
//const users = require('./routes/users.js');
const routesStartup = require('./startup/routes.js');
const databaseStartup = require('./startup/database.js');
const configStartup = require('./startup/config.js');

routesStartup(app);
databaseStartup();
configStartup();

logger.info(config.get('name'));

//app.use(express.json());
//app.use('/api/users', users);

/*
mongoose.connect(config.get('mongodb.url'))
.then(() => 
logger.info(`Connected to MongoDB at ${config.get('mongodb.url')}`))
.catch((err) => {throw new Error
    (`Fatal Error: Could not connect to MongoDB at 
    ${config.get('mongodb.url')} ${err}`)});

*/
const port = process.env.PORT || 3000;
app.listen(port, ()=> logger.info(`Listening on port ${port}`));