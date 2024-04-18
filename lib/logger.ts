/**
 * Logger function allow to log message to console (info, warning, error) with the date
 * @param message
 */
import exp from "node:constants";


const logger = {
    info: (message: string) => {
        console.log(`${new Date().toISOString()} - INFO - ${message}`);
    },
    warning: (message: string) => {
        console.log(`${new Date().toISOString()} - WARNING - ${message}`);
    },
    error: (message: string) => {
        console.log(`${new Date().toISOString()} - ERROR - ${message}`);
    }
}

export default logger;