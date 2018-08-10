$(document).ready(function() {

    $('#pokemonSubmit').on('click', function() {
        event.preventDefault();
        var name = $('#pokemonName').val();
        console.log(name);

        // $.get('/api/pokemon/' + name + '/', function(data) {
        //     console.log(data)
        //     console.log('worked');
        // })
    })

});