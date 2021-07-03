
const config = require('config');
const winston = require('winston');
require('winston-mongodb');

module.exports = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.printf((info) => `[Logger] [${info.timestamp}] ${info.message}`),
            timestamp: true,
            colorize: true,
            prettyPrint: true,
            level: 'info'
        }),
        new winston.transports.File({
            filename: config.get('logfile'),
            level: 'warn'
        }),
        new winston.transports.MongoDB({
            db: config.get('mongodb.loggingUrl'),
            format: winston.format.json(),
            level: 'info'
        })
    ],

    exceptionHandlers: [
        new winston.transports.Console({
            format: winston.format.printf((info) => `[Logger] [${info.timestamp}] ${info.message}`),
            colorize: true,
            prettyPrint: true,
        }),
        new winston.transports.File({
            filename: config.get('logfile')
        }),
        new winston.transports.MongoDB({
            db: config.get('mongodb.loggingUrl'),
            format: winston.format.json()
        })
    ],

    rejectionHandlers: [
        new winston.transports.Console({
            format: winston.format.printf((info) => `[Logger] [${info.timestamp}] ${info.message}`),
            colorize: true,
            prettyPrint: true,
        }),
        new winston.transports.File({
            filename: config.get('logfile')
        }),
        new winston.transports.MongoDB({
            db: config.get('mongodb.loggingUrl'),
            format: winston.format.json()
        })
    ]
});