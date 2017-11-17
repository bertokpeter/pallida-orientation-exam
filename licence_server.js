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
    let isItValid = validator(req.query.q);
    console.log(isItValid);
    if (isItValid){
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
    } else {
        let response = {
            "result": "error", "message": "invalid input"
        }
        res.json(response);
    }
});

app.get('/search/:brand', function(req, res){
    let selector = 'SELECT * FROM licence_plates WHERE car_brand LIKE "' + req.params.brand + '"';
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

function validator(licence_plate){
    console.log(licence_plate);
    let allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-0123456789';
    let upperCasePlate = licence_plate.toUpperCase()
    console.log(upperCasePlate);
    if (upperCasePlate.length > 7){
        return false;
    } else {
        for (let i = 0; i < upperCasePlate.length; i++){
            if (!allowedChars.includes(upperCasePlate[i])){
                console.log('hali');
                return false;
            }
        }
        return true;
    }
}

app.listen(3000);