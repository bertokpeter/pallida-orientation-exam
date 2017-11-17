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

app.listen(3000);