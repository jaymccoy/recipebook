const express = require('express');
const router = express.Router();

// Connection
function getConnection() {
    const { Client } = require('pg')
    var client = new Client({
        user: 'woeuyrgvu65HH',
        host: 'localhost',
        database: 'recipes',
        password: 'g#4GJ2b@87db@HJ',
        port: 5432,
    });
    client.connect();
    return client;
}

// Routes
router.get('/', function (req, res) {
    res.redirect('/web/recipes/');
})

router.get('/web/recipes/', function (req, res) {
    // Connect DB
    let client=getConnection();
    client.query('SELECT * FROM recipes', (err, result) => {
        if (err) console.log('Errors: '+err);

        res.render('index', {recipes: result.rows});
        client.end();
    })
    // end connect DB
});

router.post('/web/recipes/add', function(req, res) {
    // Connect DB
    let client=getConnection();
    client.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)',
        [req.body.name, req.body.ingredients, req.body.directions], (err, result) => {
            if (err) console.log('Errors: '+err);
            client.end();
            res.redirect('/web/recipes/');
        });
    // end connect DB
});

router.delete('/web/recipes/delete/:id', function (req, res) {
    // Connect DB
    let client=getConnection();
    client.query('DELETE FROM recipes WHERE id=$1', [req.params.id], (err, result) => {
        if (err) console.log('Errors: '+err);
        res.sendStatus(200);
        client.end();
    });
    // end connect DB
});

router.post('/web/recipes/edit', function(req, res) {
    // Connect DB
    let client=getConnection();
    client.query('UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE id=$4',
        [req.body.name, req.body.ingredients, req.body.directions, req.body.id], (err, result) => {
            if (err) console.log('Errors: '+err);
            client.end();
            res.redirect('/web/recipes/');
        });
    // end connect DB
});

module.exports = router;