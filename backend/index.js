// to run this from the terminal, use `npm start` from the technica2020 (base) folder

const http = require('http');
const fs = require('fs');
require('./queryapi.js');
const logger = require('./logger');
const api = require('./queryapi.js');
const { url } = require('inspector');

var log = new logger.Logger();

http.createServer((req, res) => {
    if (req.url == "/app") {
        fs.readFile("./app.html", (err, data) => {
            if (err) {
                log.error(`cant find the app page: ${err}`);
                res.statusCode = 500;
                res.end("500 Internal Server Error");
            } else {
                res.end(data);
            }
        });
    } else if (req.url == "/about") {
        fs.readFile("./about.html", (err, data) => {
            if (err) {
                log.error(`cant find the about page: ${err}`);
                res.statusCode = 500;
                res.end("500 Internal Server Error");
            } else {
                res.end(data);
            }
        });
    } else if (req.url == "/") {
        fs.readFile("./index.html", (err, data) => {
            if (err) {
                log.error(`Could not read file ./index.html: ${err}`);
                res.statusCode = 500;
                res.end("500 Internal Server Error");
            } else {
                res.end(data);
            }
        });
    } else if (req.url == "/server_api.js") {
        fs.readFile("./server_api.js", (err, data) => {
            if (err) {
                log.error(`Error when reading server_api.js: ${err}`);
                res.statusCode = 500;
                res.end("500 Internal Server Error");
            } else {
                res.end(data);
            }
        });
    } else if (req.url == "/style.css") {
        fs.readFile("./style.css", (err, data) => {
            if (err) {
                log.error(`Error when reading style.css: ${err}`);
                res.statusCode = 500;
                res.end("500 Internal Server Error");
            } else {
                res.end(data);
            }
        });
    } else if (req.url.split("?")[0] == "/get") {
        let query_string = req.url.split("?")[1];
        let query_fields = query_string.split("&"); // "api=realtor&numResults=${numberOfResults}&city=${city}&state=${state}&offset=${offset}&sort=${sort}"
        let query_object = {}; // ["api=realtor", "numResults=${numberOfResults}", "city=${city}", "state=${state}", "offset=${offset}", "sort=${sort}"]
        query_fields.forEach((key_pair) => {
            query_object[key_pair.split("=")[0]] = key_pair.split("=")[1];
        });
        if (query_object.hasOwnProperty("api") && query_object.hasOwnProperty("numResults") &&
            query_object.hasOwnProperty("city") && query_object.hasOwnProperty("state") &&
            query_object.hasOwnProperty("offset") && query_object.hasOwnProperty("sort")) {
                console.log(1);
                api.getForSale(query_object.city, query_object.state, query_object.numResults)
                .then((response) => {
                    console.log(2);
                    let cur_house; // this represents the current house in the results of the api call
                    let current_house; // this will be inserted into res_to_client
                    let house_list = []
                    //let house_index = 0;
                    for (let i=0; i<parseInt(query_object.numResults); i++) {
                        current_house = {};
                        cur_house = response.properties[i];
                        if (cur_house.listing_status == "active" && cur_house.prop_status == "for_rent") {
                            current_house.house = `${cur_house.property_id}`;
                            current_house.location = `${cur_house.address.line}, ${cur_house.address.city} ${cur_house.address.state}`;
                            current_house.pets = `Allowed:\nDogs: ${cur_house.client_display_flags.allows_dogs}, Cats: ${cur_house.client_display_flags.allows_cats}, Small Dogs: ${cur_house.client_display_flags.allows_dogs_small}, Large Dogs: ${cur_house.client_display_flags.allows_dogs_large}`;
                            current_house.other = `Year Built: ${cur_house.year_built}, Property Type: ${cur_house.prop_type}, Beds: ${cur_house.beds}`;
                            house_list.push(cur_house);
                            //house_index++;
                        }
                    }
                    res.end({
                        "results": house_list
                    });
                })
                .catch((reason) => {
                    log.error(`Error when getting api results: ${reason}`);
                })
        } else {
            log.debug(`Client request to /get had incorrect query string: ${query_fields}`);
            res.statusCode = 401;
            res.end("Fix your query string");
        }
    } else {
        res.statusCode = 404;
        res.end("404 Not Found");
    }


}).listen(5050, "0.0.0.0"); // listen on port 5050
