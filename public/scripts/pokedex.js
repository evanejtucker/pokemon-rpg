$(document).ready(function() {

// global Variables
// -----------------------------------------------------------------------------------

// pokemon object
var pokemon;

var allPokemon = [];

var battleBackgrounds = [
    {
        "type": "normal",
        "url": "/images/pokedex-backgrounds/normal-background.png" 
    },
    {
        "type": "fire",
        "url": "/images/pokedex-backgrounds/fire-background.png" 
    },
    {
        "type": "flying",
        "url": "/images/pokedex-backgrounds/flying-background.png" 
    },
    {
        "type": "grass",
        "url": "/images/pokedex-backgrounds/forest-background.jpg" 
    },
    {
        "type": "water",
        "url": "/images/pokedex-backgrounds/water-background.png" 
    },
    {
        "type": "electric",
        "url": "/images/pokedex-backgrounds/electric-background.jpg" 
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

    // search pokemon api for specified pokemon, and updates the pokedex
    var searchPokemon = function(searchTerm) {
        resetDex();
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
            console.log("data: " + data);
            console.log("New Object: " + pokemon);
            updateDexTypes(pokemon);
            // eventually I will get these to work with the new object
            findType(data);
            updateDex(data);
            // gets rid of the inputs datalist after the search
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

    // calls the search pokemon function for the previous or next pokemon in the list
    // bazed on ID
    var cyclePokemon = function(direction, pokemon) {
        if(pokemon===undefined) {
            return console.log("something went wrong")
        }
        var newId = pokemon.id;
        if(direction==='next') {
            newId+=1;
        } else {
            newId-=1;
        }
        searchPokemon(newId);
    }

    // updates the DOM when a pokemon has been searched
    var updateDex = function(pokeData) {
        image = pokeData.sprites.front_default;
        if (image == undefined) {
            image = '/images/pokedex-backgrounds/question-mark.png'
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
        // reset background back to its original
        $("#poke-image").css("background-image", "url('/images/pokedex-backgrounds/basic-background.jpg')");
        // add loading gifs and classes
        $('#sprite-image').attr('src', 'images/pokedex-backgrounds/loading1.gif');
        $('#sprite-image').addClass('sprite-image');
        $(".poke-type").html("<img class='loading-type' src='images/pokedex-backgrounds/loading6.gif'/>");
        // clear pokemon data
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
                $("#poke-image").css("background-image", "url('/images/pokedex-backgrounds/type-background.png')");
            }
        }
        
    }

    // set the pokedex info when no search results are found
    var noResults = function() {
        $('#sprite-image').attr('src', 'images/pokedex-backgrounds/question-mark.png');
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

    // will update the dom with the pokemon type images
    // pokeObject is the pokemon object created from the 
    var updateDexTypes = function(pokeObject) {

        $('#poke-type1').html('');
        $('#poke-type2').html('');
        
        for (var i=0; i<pokeObject.types.length; i++) {
            var typeHolder = '#poke-type' + (i+1);
            $(typeHolder).empty();
            var typeImage = $('<img>');
            typeImage.attr('src', "images/type-symbols/" + pokeObject.types[i].type + "-type.png");
            typeImage.attr('alt', pokeObject.types[i].type);
            typeImage.addClass('type-symbol');
            $(typeHolder).append(typeImage);
        }

    }

    // get the pokemons abilities and url links from the data object
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

    // sets input datalist options from the list of pokemon
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
        if(searchTerm.length>1) {
            $("#pokemonVal").attr('list', "pokeList");
        } else if(searchTerm.length<1) {
            $("#pokemonVal").removeAttr('list');   
        }
    }
    

// Main Process
// -----------------------------------------------------------------------------------
    
    // puts every pokemon name in a list to be used for the input dataList
    getAllPokemon();
    
    // sumbit button click
    $('#pokemonSubmit').on('click', function() {
        event.preventDefault();
        var name = $('#pokemonVal').val();
        console.log(name);
        searchPokemon(name);
    });

    // cycel button click
    $(".cycle-btn").click(function() {
        var direction = $(this).attr('direction');
        cyclePokemon(direction, pokemon);
    });

    // when user types in put box, add datalist
    $("#pokemonVal").keyup(function(event) {
        addDataList();
    });

});