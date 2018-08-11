$(document).ready(function() {

// global Variables
// -----------------------------------------------------------------------------------

var battleBackgrounds = [
    {
        "type": "normal",
        "url": "/images/normal-background.png" 
    },
    {
        "type": "fire",
        "url": "/images/fire-background.png" 
    },
    {
        "type": "flying",
        "url": "/images/flying-background.png" 
    },
    {
        "type": "grass",
        "url": "/images/forest-background.jpg" 
    },
    {
        "type": "water",
        "url": "/images/water-background.png" 
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
            var pokeTypes = [];
            for (i=0; i<data.types.length; i++) {
                pokeTypes.push(data.types[i].type.name);
            }
            // console.log(pokeTypes)

            var pokemon = {
                "name": data.name,
                "id": data.id,
                "height": data.height,
                "weight": data.weight,
                "types": pokeTypes,
            }
            console.log(pokemon);
            getType(pokemon)
        });
    }

    var updateDex = function(pokeData) {
        $('#sprite-image').attr('src', pokeData.sprites.front_default)
        $('#sprite-image').addClass('sprite-image');
    }

    var findType = function(pokeData) {
        $('#poke-image').removeClass('basic-background');
        // var type = pokeData.types[0].type.name;
        var types = [];
        for (var i=0; i<pokeData.types.length; i++) {
            console.log("type= " + pokeData.types[i].type.name);
            types.push(pokeData.types[i].type.name);
        }
        console.log(types);
    
        for (var m=0; m<battleBackgrounds.length; m++) {
            // change the poke-image background based on pokemon type
            // if several, and random is selected
            if (types[arrayRand(types)] === battleBackgrounds[m].type) {
                $("#poke-image").css("background-image", "url(" + battleBackgrounds[m].url + ")");
                return;
            } else {
                $("#poke-image").css("background-image", "url('/images/normal-background.jpg')");
            }
        }
        
    }

    // function to get a random index from an array and return the result
    var arrayRand = function(array) {
        if (array.length === 0) {
            return 0;
        } else {
            var rand = Math.floor(Math.random() * array.length);
            return rand;
        } 
    }

    var getType = function(pokemon) {
        console.log(pokemon.types);
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