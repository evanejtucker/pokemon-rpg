$(document).ready(function() {

// global Variables
// -----------------------------------------------------------------------------------

var allPokemon = [];

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
    },
    {
        "type": "electric",
        "url": "/images/electric-background.jpg" 
    }

]


// Functions
// -----------------------------------------------------------------------------------

    var getAllPokemon = function() {
        $.get({
            url: 'https://pokeapi.co/api/v2/pokemon/?limit=949',
        }).done(function(data) {
            console.log(data);
            allPokemon = [];
            for (var i =0; i<data.results.length; i++) {
                var poke = data.results[i].name;
                allPokemon.push(poke);
            }
            dataListOption(allPokemon)
        }).fail(function(err){
            if (err) {
                console.log('something went wrong');
            }
        });
    }

    // search pokemon api for specified pokemon
    var searchPokemon = function(searchTerm) {

        resetDex();

        var pokemon = [];
        var queryUrl = 'https://pokeapi.co/api/v2/pokemon/' + searchTerm + '/';

        $.get({
            url: queryUrl,
        }).done(function(data) {

            if (data === undefined) {
                console.log("no results found");
                return;
            }

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
            updateDex(data);
            $("#pokemonVal").removeAttr('list');
        }).fail(function(err){
            if (err) {
                console.log('something went wrong');
                console.log(err);
                noResults();
            }
        });

        // clear input field
        $('#pokemonVal').val('');
    }

    // updates the DOM when a pokemon has been searched
    var updateDex = function(pokeData) {
        image = pokeData.sprites.front_default;
        if (image == undefined) {
            image = '/images/question-mark.png'
        }
        $('#sprite-image').attr('src', image)
        $('#sprite-image').addClass('sprite-image');
        $('#pokeName').text(pokeData.name);
        $('#pokeId').text("ID: " + pokeData.id);
        $('#pokeHeight').text("Height: " + pokeData.height);
        $('#pokeWeight').text("Weight: " + pokeData.weight);
    }

    // sets the pokedex back to its original values
    var resetDex = function() {
        $("#poke-image").css("background-image", "url('/images/basic-background.jpg')");
        $('#sprite-image').attr('src', 'images/loading1.gif');
        $('#sprite-image').addClass('sprite-image');
        $('#pokeName').text('');
        $('#pokeId').text('');
        $('#pokeHeight').text('');
        $('#pokeWeight').text('');
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

    var noResults = function() {
        $('#sprite-image').attr('src', 'images/question-mark.png');
        $('#pokeName').text('no results found');
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

    var dataListOption = function(list) {
        for (var i=0; i<list.length; i++) {
            var option = $('<option>');
            option.attr('value', list[i]);
            option.text(list[i]);
            option.addClass('hiddenOptions')
            $('#pokeList').append(option);
        }
    }

    // add the data list after the user has types a few letters
    var addDataList = function() {
        var searchTerm = $("#pokemonVal").val();
        if(searchTerm.length>2) {
            $("#pokemonVal").attr('list', "pokeList");
        } else if(searchTerm.length<2) {
            $("#pokemonVal").removeAttr('list');   
        }
    }
    

// Main Process
// -----------------------------------------------------------------------------------
    
    // puts every pokemon name in a list to be used for the input dataList
    getAllPokemon();
    

    $('#pokemonSubmit').on('click', function() {
        event.preventDefault();
        var name = $('#pokemonVal').val();
        console.log(name);
        searchPokemon(name);
    });

    $("#pokemonVal").keyup(function(event) {
        addDataList();
    });

});