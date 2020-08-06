var express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    cons = require("consolidate"),
    dust = require("dustjs-helpers"),
    pg = require("pg"),
    app = express();

// // Connection
// function getConnection() {
//     const { Client } = require('pg')
//     var client = new Client({
//         user: 'woeuyrgvu65HH',
//         host: 'localhost',
//         database: 'recipes',
//         password: 'g#4GJ2b@87db@HJ',
//         port: 5432,
//     });
//     client.connect();
//     return client;
// }

// Assign Dust Engine to .dust files
app.engine('dust', cons.dust);

// Set default ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');


// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Inject all api recipes endpoints
const api_recipes = require('./routes/api-recipes.js');
app.use(api_recipes);

// Inject all web recipes endpoints
const web_recipes = require('./routes/web-recipes.js');
app.use(web_recipes);

// Server
app.listen(3000, function () {
    console.log('Server started on port 3000');
});