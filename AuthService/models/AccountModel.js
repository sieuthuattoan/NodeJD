const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const accountSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value=>{
            if(!validator.isEmail(value)){
                throw new Error({err:'Invalid email address'});
            };
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 7
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
});


accountSchema.pre('save', async function(next){
    //Hash the password before saving the user model
    
});