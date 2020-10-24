// to run this from the terminal, use `npm start` from the technica2020 folder

const http = require('http');
const fs = require('fs');
require('./queryapi.js');
const logger = require('./logger');

var log = new logger.Logger();

http.createServer((req, res) => {
    if (req.url == "/"){
        fs.readFile("../index.html", (err, data) => {
            if (err) {
                log.error(`Could not read file ./index.html: ${err}`);
                res.statusCode = 500;
                res.end("500 Internal Server Error");
            } else {
                res.end(data);
            }
        });
    } else {
        res.statusCode = 404;
        res.end("404 Not Found");
    }

    if (req.url == "/app") {
        res.end("the app finna be here");
    }

    if (req.url == "/about") {
        res.end("about");
    }

}).listen(5050, "0.0.0.0");
