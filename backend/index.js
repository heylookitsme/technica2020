// to run this from the terminal, use `npm start`

const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.url == "/") {
        res.end("Hello World!");
    }
}).listen(5000, "0.0.0.0");