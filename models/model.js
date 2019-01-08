const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const inserts = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    job:{
        type: String,
        default:'USER_ROLE'
    },
    age:{
        type: Number,
        required:true
    }

});

module.exports = mongoose.model('insertion',inserts);