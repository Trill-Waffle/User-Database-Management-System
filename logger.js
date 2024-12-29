import { createLogger,format,transports } from "winston";


const{combine, timestamp, printf} = format;

const logFormat = printf(({ level, message, timestamp}) =>{
    return `${timestamp} [${level}]: ${message}`
});

const logger = createLogger({
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'application.log'})
    ]
});

export default logger;