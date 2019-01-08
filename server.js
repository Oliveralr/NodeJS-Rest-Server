'use strict';
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use( require('./routes/user') );

app.use(bodyParser.json());

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27018/coffee',(err,res)=>{
    if(err) throw err;
    console.log('GOOD')
});

app.listen(port,()=>
{console.log(`Listening on Port: ${port}`)});