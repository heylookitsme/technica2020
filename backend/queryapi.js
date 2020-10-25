var unirest = require("unirest");

function getForSale(city, state_code, limit) {
	return new Promise((resolve, reject) => { // make this asynchronous
		console.log(0.1);
		var rq = unirest("GET", "https://realtor.p.rapidapi.com/properties/v2/list-for-sale");
		rq.query({
			"price_max":"50000", //arbitrary, change later or add a slider later. the idea is there should be a max tho because 
						//we're looking for affordable housing 
			"sort": "price_low",
			"city": city,
			"state_code": state_code,
			"limit": limit,
			"offset": "0"
		});
		rq.headers({
			"x-rapidapi-host": "realtor.p.rapidapi.com",
			"x-rapidapi-key": process.env[realtor_api_key],
			"useQueryString": true
		});
		rq.end(function (rs) {
			console.log("Inside rs callback");
			if (rs.error) {
				reject(new Error(rs.error)); // effectively throw an error
			} else {
				console.log(rs.body);
				resolve(rs.body); // successfully return the received data
			}
		});
	});

	var unirest = require("unirest"); // this is unreachable

}

exports.getForSale = getForSale;
