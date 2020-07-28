var express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    cons = require("consolidate"),
    dust = require("dustjs-helpers"),
    pg = require("pg"),
    app = express();

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

// Routes
app.get('/', function (req, res) {
    // Connect DB
        const connectionString = 'postgresql://woeuyrgvu65HH:"g#4GJ2b@87db@HJ"@127.0.0.1:5432/postgres'
        const { Pool, Client } = require('pg')
        const client = new Client({
            user: 'woeuyrgvu65HH',
            host: 'localhost',
            database: 'recipes',
            password: 'g#4GJ2b@87db@HJ',
            port: 5432,
        })
        client.connect()
        client.query('SELECT * FROM recipes', (err, result) => {
            if (err) console.log('Errors: '+err);

            res.render('index', {recipes: result.rows});
            client.end();
        })
    // end conncect DB
});

app.post('/add', function(req, res) {
    // Connect DB
        const connectionString = 'postgresql://woeuyrgvu65HH:"g#4GJ2b@87db@HJ"@127.0.0.1:5432/postgres'
        const { Pool, Client } = require('pg')
        const client = new Client({
            user: 'woeuyrgvu65HH',
            host: 'localhost',
            database: 'recipes',
            password: 'g#4GJ2b@87db@HJ',
            port: 5432,
        })
        client.connect()
        client.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)',
            [req.body.name, req.body.ingredients, req.body.directions], (err, result) => {
            if (err) console.log('Errors: '+err);
            client.end();
            res.redirect('/');
        });
    // end conncect DB
});

app.delete('/delete/:id', function (req, res) {
    // Connect DB
        const connectionString = 'postgresql://woeuyrgvu65HH:"g#4GJ2b@87db@HJ"@127.0.0.1:5432/postgres'
        const { Pool, Client } = require('pg')
        const client = new Client({
            user: 'woeuyrgvu65HH',
            host: 'localhost',
            database: 'recipes',
            password: 'g#4GJ2b@87db@HJ',
            port: 5432,
        })
        client.connect()
        client.query('DELETE FROM recipes WHERE id=$1', [req.params.id], (err, result) => {
            if (err) console.log('Errors: '+err);
            res.sendStatus(200);
            client.end();
        });
    // end conncect DB
});

app.post('/edit', function(req, res) {
    // Connect DB
    const connectionString = 'postgresql://woeuyrgvu65HH:"g#4GJ2b@87db@HJ"@127.0.0.1:5432/postgres'
    const { Pool, Client } = require('pg')
    const client = new Client({
        user: 'woeuyrgvu65HH',
        host: 'localhost',
        database: 'recipes',
        password: 'g#4GJ2b@87db@HJ',
        port: 5432,
    })
    client.connect()
    client.query('UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE id=$4',
        [req.body.name, req.body.ingredients, req.body.directions, req.body.id], (err, result) => {
            if (err) console.log('Errors: '+err);
            client.end();
            res.redirect('/');
        });
    // end conncect DB
});

// Server
app.listen(3000, function () {
    console.log('Server started on port 3000');
});