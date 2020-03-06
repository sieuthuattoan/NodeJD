var Mongoose = require('mongoose');
//var Validator = require('validator');
//const ResponseObj = require('../config/responseMsgConfig');

var userSchema = Mongoose.Schema({
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

var Exporter = Mongoose.model('UserProfile',userSchema);

module.exports = Exporter;