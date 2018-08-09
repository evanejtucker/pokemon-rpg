
module.exports = (app, request)=> {
    app.get('/api/all', (req, res, next)=> {
        var pokemon = ['Evan']
        request('https://pokeapi.co/api/v2/pokemon/1/', function(err, response, body) {
            pokemon.push("Evan");
            res.send(response);
        });        
    });
};


