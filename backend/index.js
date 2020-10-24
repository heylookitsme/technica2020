// to run this from the terminal, use `npm start` from the technica2020 (base) folder

const http = require('http');
const fs = require('fs');
require('./queryapi.js');
const url = require('url');
const logger = require('./logger');
const api = require('./queryapi.js');

var log = new logger.Logger();

http.createServer((req, res) => {
   const queryObject = url.parse(req.url,true).query;
   console.log(queryObject);
   if (url.parse(req.url,true).pathname == "/app") {
	fs.readFile("./app.html", (err, data) => {
            if (err) {
                log.error(`cant find the app page: ${err}`);
                res.statusCode = 500;
                res.end("500 Internal Server Error");
            } else {
                res.end(data);
            }
        });

    } else if (url.parse(req.url,true).pathname == "/about") {
	fs.readFile("./about.html", (err, data) => {
            if (err) {
                log.error(`cant find the about page: ${err}`);
                res.statusCode = 500;
                res.end("500 Internal Server Error");
            } else {
                res.end(data);
            }
        });
    }else if (url.parse(req.url,true).pathname == "/"){
        fs.readFile("./index.html", (err, data) => {
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


}).listen(5050, "0.0.0.0"); // listen on port 5050
