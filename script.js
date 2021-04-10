'user strict';

function getBrewery(state, type) {

    const url = `https://api.openbrewerydb.org/breweries?by_state=${state}&sort=${type}`;
    console.log(url);
    console.log(state);
    
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))

        .catch(err => {
            $("#js-error-message").text(`something is wrong: ${err.message}`);
        });

}


function displayResults(responseJson) {
    console.log(responseJson);
    $("#results").empty();
    for(let i = 0; i < responseJson.length; i++){
        console.log(responseJson[i]);
        // for(let j = 0; j < responseJson.length; j++){
       
        $("#results").append(`<ul><li>${responseJson[i].name}</li><li>${responseJson[i].brewery_type}</li></ul>`);
        $("#results").removeClass("hidden");
    }
    }
// }




function watchForm() {
    $('form').submit(e => {
        e.preventDefault();
        const state = $("#query-state").val();
        const type = $("#brewery").val();
        console.log(state);
        getBrewery(state, type);
    });
    
}
$(watchForm);
