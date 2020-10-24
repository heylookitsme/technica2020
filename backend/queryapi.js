function getForRent(city, state_code, limit){

var unirest = require("unirest");
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
	"x-rapidapi-key": "b44a7a293fmshdf432f78a52387ap1c0c34jsn2dfe48411384",
	"useQueryString": true
});

rq.end(function (rs) {
	if (rs.error) throw new Error(rs.error);
	console.log(rs.body);
});

}
