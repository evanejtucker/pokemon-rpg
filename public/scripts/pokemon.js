$(document).ready(function() {
    console.log('the script is running');

    var pokemon = [];

    var getPokemon = function(number) {
        var queryUrl = "https://pokeapi.co/api/v2/pokemon/" + number + "/";
        console.log(queryUrl);
        $.ajax({
            method: 'get',
            url: queryUrl
        }).done(function(data) {
            pokemon.push(data.name);
        });
        console.log(pokemon)
    }

    // getPokemon(1);

});