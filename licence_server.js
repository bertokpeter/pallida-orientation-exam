'use strict';

const express = require('express');
const app = express();

const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'licence_plates'
})

conn.connect(function(err){
    if(err){
        console.log("Error connecting to Db");
        return;
    } else {
        console.log("Connection established");
    }
});

app.use('/assets', express.static('./assets'));
app.use(express.json());

app.get('/', function(req, res){
    res.sendFile(__dirname + '/licence.html');
});

app.get('/search', function(req, res){
    let selector = 'SELECT * FROM licence_plates WHERE plate LIKE "%' + req.query.q + '%"';
    if (req.query.police){
        selector += 'AND plate LIKE "RB%"'
    } else if (req.query.diplomat){
        selector += 'AND plate LIKE "DT%"'
    }
    conn.query(selector, function(err, rows){
        if(err) {
            console.log(err.toString());
        }
        console.log("Data received from Db:\n");
        let response = {"result": 'ok',
                        "data":[]};
        rows.forEach(function(row){
            response.data.push({
                "licence": row.plate,
                "brand": row.car_brand,
                "model": row.car_model,
                "year": row.year,
                "color": row.color
            });
        });
        res.json(response);
    });
});

app.listen(3000);