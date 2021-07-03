
require('express-async-errors');
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const config = require('config');
const logger = require('./middleware/logger.js');
const routes = require('./startup/routes.js');
const database = require('./startup/database.js');;

logger.info(config.get('name'));

app.use(express.json());

mongoose.connect(config.get('mongodb.url'))
.then(() => 
logger.info(`Connected to MongoDB at ${config.get('mongodb.url')}`))
.catch((err) => {throw new Error
    (`Fatal Error: Could not connect to MongoDB at 
    ${config.get('mongodb.url')} ${err}`)});

const port = process.env.PORT || 3000;
app.listen(port, ()=> logger.info(`Listening on port ${port}`));