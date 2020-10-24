var unirest = require("unirest");

function getForRent(city, state_code, limit) {
	return new Promise((resolve, reject) => { // make this asynchronous
		var rq = unirest("GET", "https://realtor.p.rapidapi.com/properties/v2/list-for-rent");
		rq.query({
			"sort": "relevance",
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
			if (rs.error) {
				reject(new Error(rs.error)); // effectively throw an error
			} else {
				resolve(rs.body); // successfully return the received data
			}
		});
	});
}

exports.getForRent = getForRent;