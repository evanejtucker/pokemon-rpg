const express = require('express');
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const request = require('request');
// const apiRoutes = require('./controller/api-routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static('public'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

require('./controller/page-routes.js')(app);
require('./controller/api-routes.js')(app, request);

// app.use('/api', apiRoutes)


app.listen(port, (err)=> {
    if (err) {
        console.log('something went wrong');
    } else {
        console.log(`app listening on port ${port}!`);
    }
});