$(document).ready(function() {

// global Variables
// -----------------------------------------------------------------------------------



// Functions
// -----------------------------------------------------------------------------------

    // search pokemon api for specified pokemon
    var searchPokemon = function(pokemon) {
        var queryUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokemon + '/';
        $.get({
            url: queryUrl,
        }).done(function(data) {
            console.log(data);
            $('#pokemonVal').val('');
            updateDex(data)
        });
    }

    var updateDex = function(pokemonData) {
        // var poke = $('<img>')
        // poke.attr('src', pokemonData.sprites.front_default);
        // poke.addClass('sprite-image')
        // $('#poke-image').html(poke);
        $('#sprite-image').attr('src', pokemonData.sprites.front_default)
        $('#sprite-image').addClass('sprite-image')
    }


// Main Process
// -----------------------------------------------------------------------------------
    
    $('#pokemonSubmit').on('click', function() {
        event.preventDefault();
        var name = $('#pokemonVal').val();
        console.log(name);
        searchPokemon(name);
    });

});