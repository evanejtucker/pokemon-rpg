
module.exports = (app, request)=> {
    app.get('/api/all', (req, res, next)=> {
        var pokemon;
        // request('https://pokeapi.co/api/v2/pokemon/1/', function(err, response, body) {
        //     console.log('it worked');
        //     pokemon = body; 
        // }).then(function() {
        //     res.send(pokemon);
        // });
        request({
            uri: 'https://pokeapi.co/api/v2/pokemon/1/',
            method: 'GET'
        }, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body)
              }
        })
    });
};


