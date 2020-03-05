var mongoose = require('mongoose');
var validator = require('validator');
const responseObj = require('../config/responseMsgConfig');

var userSchema = mongoose.Schema({
    accountId:{
        type: String,
        require: true,
    },
    firstName:{
        type: String,
        trim: true
    },
    lastName:{
        type: String,
        trim: true
    },
    addressName:{
        type: String,
        trim: true
    },
    birthDate:{
        type: Date
    },
    createdDate:{
        type: Date
    },
    updatedDate:{
        type: Date
    },
});

var Exporter = mongoose.model('User',userSchema);

module.exports = Exporter;