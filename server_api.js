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
var currentNumberOfHouses = 0;

function getForRent(city, state, offset=0, numberOfResults=10, sort="relevance") {
    //console.log("Getting houses");
    return new Promise((resolve) => {
        //console.log("Promise returned");
        fetch(`./get?api=realtor&numResults=${numberOfResults}&city=${city}&state=${state}&offset=${offset}&sort=${sort}`)
        .then((response) => {
            if (!(response.ok)) {
                console.log(error);
                throw `Response on getForRent fetch call was ${response.status}`;
            } else {
                //console.log("Success");
                return response.json();
            }
        })
        .then((json) => {
            //console.log(json);
            resolve(json.results);
        })
        .catch((reason) => {
            console.error(`Failed to get housing data: ${reason}`);
            resolve([]);
        });
    });
}

function generateHouses(city, state, offset=0, numberOfResults=10, sort="relevance") {
    deleteAllHouses();
    let house, price, address, otherInfo;
    let houseList = document.getElementById("house-list");
    console.log(houseList);
    getForRent(city, state, offset, numberOfResults, sort)
    .then((result) => {
        if (result != []){
            for (let i=0; i<20; i++) {
                //console.log(i);
                houseDiv = document.createElement("div");
                houseDiv.setAttribute("id", `house-div-${i}`)

                house = document.createElement("h2");
                house.setAttribute("id", `house-${i}`);
                house.innerText = result[i].house;

                pets = document.createElement("p");
                house.setAttribute("id", `pets-${i}`);
                pets.innerText = result[i].pets;

                address = document.createElement("p");
                address.setAttribute("id", `address-${i}`);
                address.innerText = result[i].location;

                otherInfo = document.createElement("p");
                otherInfo.setAttribute("id", `other-info-${i}`);
                otherInfo.innerText = result[i].other;

                houseList.appendChild(houseDiv);
                houseList.appendChild(house);
                houseList.appendChild(pets);
                houseList.appendChild(address);
                houseList.appendChild(otherInfo);
            }
            currentNumberOfHouses = numberOfResults;
        } else {
            throw "No houses returned from getForRent() call";
        }
    })
    .catch((reason) => {
        console.error(`Error when getting house data: ${reason}`);
    })
}

function deleteAllHouses() {
    for (let i=0; i<currentNumberOfHouses; i++) {
        deleteHouse(i);
    }
}

function deleteHouse(houseNumber) {
    let houseList = document.getElementById(`house-list-${i}`);
    let ids = [`house-div-${houseNumber}`, `house-${houseNumber}`, `pets-${houseNumber}`,
        `address-${houseNumber}`, `other-info-${houseNumber}`];
    let element;
    for (let i=0; i<5; i++) {
        element = document.getElementById(ids[i]);
        if (element) { // if it exists, delete it
            houseList.removeChild(element);
        }
    }
}