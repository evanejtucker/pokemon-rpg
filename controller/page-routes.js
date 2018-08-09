
module.exports = (app)=> {
    app.get('/', (req, res, next)=> {
        res.render('home');
    });

    app.get('/pokedex', (req, res, next)=> {
        res.render('pokedex');
    });
};