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
    var searchPokemon = function(searchTerm) {

        $("#poke-image").css("background-image", "url('/images/basic-background.jpg')");
        $('#sprite-image').attr('src', 'images/loading1.gif');
        $('#sprite-image').addClass('sprite-image');

        var pokemon = [];
        var queryUrl = 'https://pokeapi.co/api/v2/pokemon/' + searchTerm + '/';

        $.get({
            url: queryUrl,
        }).done(function(data) {

            // object to keep only the data I need
            pokemon = {
                "name": data.name,
                "id": data.id,
                "height": data.height,
                "weight": data.weight,
                "types": getTypes(data),
                "abilities": getAbilities(data)
            }
            console.log(data);
            console.log(pokemon);

            findType(data);
            updateDex(data)
        });

        // clear input field
        $('#pokemonVal').val('');
    }

    // updates the DOM when a pokemon has been searched
    var updateDex = function(pokeData) {
        $('#sprite-image').attr('src', pokeData.sprites.front_default)
        $('#sprite-image').addClass('sprite-image');
        $('#pokeName').text(pokeData.name);
        $('#pokeId').text("ID: " + pokeData.id);
        $('#pokeHeight').text("Height: " + pokeData.height);
        $('#pokeWeight').text("Weight: " + pokeData.weight);
    }

    var findType = function(pokeData) {
        $('#poke-image').removeClass('basic-background');
        var types = [];
        for (var i=0; i<pokeData.types.length; i++) {
            types.push(pokeData.types[i].type.name);
        }
    
        for (var m=0; m<battleBackgrounds.length; m++) {
            // change the poke-image background based on pokemon type
            // if several, and random is selected
            if (types[arrayRand(types)] === battleBackgrounds[m].type) {
                $("#poke-image").css("background-image", "url(" + battleBackgrounds[m].url + ")");
                return;
            } else {
                $("#poke-image").css("background-image", "url('/images/type-background.png')");
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

    // gets the pokemon types from the data, and saves them in an array
    var getTypes = function(pokeData) {
        var pokeTypes = [];
        for (i=0; i<pokeData.types.length; i++) {
            var type = {
                "type": pokeData.types[i].type.name,
                "url": pokeData.types[i].type.url
            }
            pokeTypes.push(type);
        }
        return pokeTypes;
    }

    var getAbilities = function(pokeData) {
        var pokeAbilities = [];
        for (var i=0; i<pokeData.abilities.length; i++) {
            var ability = {
                "ability": pokeData.abilities[i].ability.name,
                "url": pokeData.abilities[i].ability.url
            }
            pokeAbilities.push(ability);
        }
        return pokeAbilities;
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