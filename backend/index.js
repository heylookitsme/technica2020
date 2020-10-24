// to run this from the terminal, use `npm start`

const http = require('http');
const fs = require('fs');
require('./queryapi.js');

http.createServer((req, res) => {
    if (req.url == "/") {
        res.end("Hello World!");
    }

    if (req.url == "/app") {
        res.end("the app finna be here");
    }

    if (req.url == "/about") {
        res.end("about");
    }

}).listen(5050, "0.0.0.0");
