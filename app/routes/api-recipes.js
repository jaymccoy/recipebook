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

router.get('/api/recipes', function(req, res) {
    let connection=getConnection();
    const queryString = "SELECT * FROM recipes";
    connection.query(queryString, (err, rows, fields) => {
        if(err) {
            console.log("Failed to query recipes: " + err);
            res.sendStatus(500)
            return
        }
        res.json(rows.rows)
    })
})

router.get('/api/recipes/:id', function(req, res) {
    let connection=getConnection();
    const itemId = req.params.id;
    //TODO: check if itemId is numeric
    const queryString = "SELECT * FROM recipes WHERE id = $1";
    connection.query(queryString, [itemId], (err, rows) => {
        if(err) {
            console.log("Failed to query recipes: " + err);
            res.sendStatus(500)
            return
        }
        res.json(rows.rows[0])
    })
})

module.exports = router;