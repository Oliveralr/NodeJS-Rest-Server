'use strict';
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/model');
const app = express();

app.get('/',(req,res) => {
    res.json('Hallo!');
})

app.post('/user', (req,res) => {
    let body = req.body;

    const user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
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

        userDB.password = null;

        res.status(200).json({
            ok: true,
            user: userDB
        });
    });
})

app.put('/user/:id',(req,res) => {
    const data = req.params.id
    let body = req.body

    User.findByIdAndUpdate(data, body, {new:true}, (err, enjoy) => {
        if(err){
            return res.status(400).json({
                ok: true,
                err
            });
        }
        res.status(200).json({
            ok:true,
            user: enjoy
        });
    });
})

module.exports = app;