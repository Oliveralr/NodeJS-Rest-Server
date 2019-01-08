'use strict';
const express = require('express');
const User = require('../models/model');
const app = express();

app.get('/',(req,res) => {
    res.json('Hallo!');
})

app.post('/user', (req,res) => {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        job: body.job,
        age: body.age
    });

    user.save((err, userDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            user: userDB
        });
    });
})

app.put('/data:id',(req,res) => {
    const data = req.params.id
    res.json({
        data
    })
})

module.exports = app;