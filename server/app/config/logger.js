"use strict";

const {createLogger,transports,format} = require("winston");
const {combine,colorize,timestamp,printf,label,simple} = format;
const winstonDaily = require("winston-daily-rotate-file");

const printFormat = printf(({timestamp,label,level,message}) => {
    return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
    file :combine(
        label({
            label: "codiary"
        }),
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        printFormat,
    ),
    console: combine(
        colorize(),
        simple(),
    ),
};

const opts = {
    file: new winstonDaily({
        filename: "%DATE%.access.log",
        dirname: "./logs",
        level:"info",
        maxFiles:30,
        zippedArchive:true,
        format: printLogFormat.file,
    }),
    fileErr :new winstonDaily({
        filename: "%DATE%.error.log",
        dirname: "./logs/error",
        level:"error",
        maxFiles:30,
        zippedArchive:true,
        format: printLogFormat.file,
    }),
    console: new transports.Console({
        level:"debug",
        format: printLogFormat.console,
    })
}

const logger = createLogger({
    transports:[opts.file,opts.fileErr],
});

if (process.env.NODE_ENV !== "production"){
    logger.add(opts.console);
}

logger.stream = {
    write:(message) => logger.info(message),
};

module.exports = logger;