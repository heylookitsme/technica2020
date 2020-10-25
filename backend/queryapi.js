function getForSale(city, state_code, limit) {
	//var unirest = require("unirest");
	return new Promise((resolve, reject) => { // make this asynchronous
		const config = require("../config.json");
		var http = require("https");
		var options = {
			"method": "GET",
			"hostname": "realtor.p.rapidapi.com",
			"port": null,
			"path": `/properties/v2/list-for-rent?sort=relevance&city=${city}&state_code=${state_code}&limit=${limit}&offset=0`,
			"headers": {
				"x-rapidapi-host": "realtor.p.rapidapi.com",
				"x-rapidapi-key": config.realtorKey,
				"useQueryString": true
			}
		};
		var req = http.request(options, function (res) {
			var chunks = [];
			res.on("data", function (chunk) {
				chunks.push(chunk);
			});
			res.on("end", function () {
				var body = Buffer.concat(chunks);
				resolve(body.toJSON());
			});
			res.on('error', (err) => {
				reject(err);
			});
		});
		req.end();
		/*
		console.log(0.1);
		var rq = unirest.get("https://realtor.p.rapidapi.com/properties/v2/list-for-sale").query({
			"price_max":"50000", //arbitrary, change later or add a slider later. the idea is there should be a max tho because 
						//we're looking for affordable housing 
			"sort": "price_low",
			"city": city,
			"state_code": state_code,
			"limit": limit,
			"offset": "0"
		}).header({
			"x-rapidapi-host": "realtor.p.rapidapi.com",
			"x-rapidapi-key": process.env[realtor_api_key],
			"useQueryString": true
		}).end(function (rs) {
			console.log("Inside rs callback");
			if (rs.error) {
				reject(new Error(rs.error)); // effectively throw an error
			} else {
				console.log(rs.body);
				resolve(rs.body); // successfully return the received data
			}
		});
		*/
	});

	var unirest = require("unirest"); // this is unreachable

}

exports.getForSale = getForSale;
