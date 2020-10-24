/*
Fetches data about houses that are available to rent

Parameters:
city: The city to search in (e.g. "New York City")
state: A two-letter code representing the state to search in (e.g. "NY")
offset: A number representing what point in the list of results should be the start point for 
    returning results (so, "return <numberOfResults> results starting at item number <offset>").
    Default is 0, representing the beginning of the list of results
numberOfResults: The number of results to get back from the search (default is 10)
sort: How the search should be done (default is to search by relevance)

Return Value:
Type array
An array of result objects
*/
function getForRent(city, state, offset=0, numberOfResults=10, sort="relevance") {
    let results;
    fetch(`./get?api=realtor&numResults=${numberOfResults}&city=${city}&state=${state}&offset=${offset}`)
    .then((response) => {
        if (!(response.ok)) {
            throw `Response on getForRent fetch call was ${response.status}`
        } else {
            return response.json();
        }
    })
    .then((json) => {
        result
    })
}