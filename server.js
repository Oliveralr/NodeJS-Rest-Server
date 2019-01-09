'use strict';
require('./config/config.js');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use( require('./routes/user') );

app.use(bodyParser.json());

const port = process.env.PORT || 5000;

mongoose.connect(process.env.URLDB,(err,res)=>{
    if(err) throw err;
    console.log('GOOD')
});

app.listen(process.env.PORT,()=>
{console.log(`Listening on Port: ${process.env.PORT}`)});