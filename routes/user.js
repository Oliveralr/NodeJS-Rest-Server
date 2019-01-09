'use strict';
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/model');
const _ = require('underscore');
const app = express();

app.get('/user',(req,res) => {

    let from = req.query.from || 0;
    let from_converted = Number(from);

    let limit = req.query.limit || 16;
    let limitless = Number(limit);

    User.find({}, 'name email job')
        .skip(from_converted)
        .limit(limitless)
        .exec((err, users)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({}, (err, counting) => {
                res.json({
                    users,
                    counter:counting
                })
            });

            res.status(200).json({
                ok: true,
                users: users
            });

        })

});

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
    let body = _.pick(req.body, ['name','email','password','job','age']);

    User.findByIdAndRemove(data, body, {new:true}, (err, enjoy) => {
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
});

app.delete('/user/:id', (req,res)=>{
    let id = req.params.id;

    User.findByIdAndUpdate(id, (err,deleted) =>{
        if(err){
            return res.status(400).json({
                ok: false
            })
        }

        if(deleted){
           return res.status(400).json({
                ok: true,
                err:{
                    message:'User Not Found'
                }
            })
        }

        res.status(200).json({
            ok: true,
            user: deleted
        })
    });
})

module.exports = app;