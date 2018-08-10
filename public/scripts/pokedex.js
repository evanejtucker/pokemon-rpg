$(document).ready(function() {

// global Variables
// -----------------------------------------------------------------------------------

var battleBackgrounds = [
    {
        "type": "normal",
        "url": "/images/forest-background.jpg" 
    },
    {
        "type": "fire",
        "url": "/images/fire-background.jpg" 
    },
    {
        "type": "flying",
        "url": "/images/fire-background.jpg" 
    }
]


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
            findType(data);
        });
    }

    var updateDex = function(pokeData) {
        $('#sprite-image').attr('src', pokeData.sprites.front_default)
        $('#sprite-image').addClass('sprite-image');
    }

    var findType = function(pokeData) {
        $('#poke-image').removeClass('basic-background');
        var type = pokeData.types[0].type.name;
        console.log(type);
        for (var i=0; i<battleBackgrounds.length; i++) {
            if (type === battleBackgrounds[i].type) {
                $("#poke-image").css("background-image", "url(" + battleBackgrounds[i].url + ")");
            } else {
                $("#poke-image").css("background-image", "url('/images/basic-background.jpg')");
            }
        }
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