'user strict';

function getBrewery(state) {

    const url = `https://api.openbrewerydb.org/breweries?by_state=${state}`;
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
    for(let i = 0; i < responseJson.length; i++){
        console.log(responseJson[i]);
        $("#results").empty();
        $("#results").append(`<ul><li>${responseJson[i].name}</li></ul>`);
        $("#results").removeClass("hidden");
    }

}




function watchForm() {
    $('form').submit(e => {
        e.preventDefault();
        const state = $("#query-state").val();
        console.log(state);
        getBrewery(state);
    });
    
}
$(watchForm);