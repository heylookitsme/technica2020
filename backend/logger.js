const fs = require('fs');

class Logger {
    constructor(path="./logs/serverlogs.txt") { // preferably don't change the default value
        fs.readFile(path, (err, data) => {
            if (err) {
                fs.mkdir(path.split("/")[1], (err) => {
                    if (err){
                        console.error(`Couldn't instantiate Logger object: ${err}`);
                    } else {
                        fs.writeFile(path, "", (err) => {
                            if (err) {
                                console.error(`Could not create file ${path}: ${err}`);
                            } else {
                                this.path = path;
                            }
                        })
                    }
                });
            } else {
                this.path = path;
            }
        });
    }

    write_to_log(data) {
        fs.appendFile(this.path, data, (err) => {
            if (err) {
                console.error(`Could not write to log file: ${err}`);
            }
        })
    }

    /*
    DEBUG	Designates fine-grained informational events that are most useful to debug an application.
    INFO	Designates informational messages that highlight the progress of the application at coarse-grained level.
    WARN	Designates potentially harmful situations.
    ERROR	Designates error events that might still allow the application to continue running.
    FATAL	Designates very severe error events that will presumably lead the application to abort.
    */


    // the following are basically wrapper functions
    debug(message) {
        this.write_to_log(`DEBUG: ${message}\n`);
    }

    info(message) {
        this.write_to_log(`INFO: ${message}\n`);
    }

    warn(message) {
        this.write_to_log(`WARN: ${message}\n`);
    }

    error(message) {
        this.write_to_log(`ERROR: ${message}\n`);
    }

    fatal(message) {
        this.write_to_log(`FATAL: ${message}\n`);
    }
}

exports.Logger = Logger;