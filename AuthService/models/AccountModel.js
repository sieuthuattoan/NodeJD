const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const responseObj = require('../config/responseMsgConfig');

const accountSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value=>{
            if(!validator.isEmail(value)){
                throw new Error({err: responseObj.MESSAGE.INVALID_EMAIL});
            };
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 7
    },
    createdDate:{
        type: Date
    },
    updatedDate:{
        type: Date
    },
    isActivated:{
        type: Boolean,
        default: false
    },
    tokens:{ //store a list of token
        type: [String],
        required: true
    }
});

//Hash the password before saving the user model
//cannot use "this" if u use arrow function => you should try regular function instead
accountSchema.pre('save', async function(next){
    const account = this;
    if(account.isModified('password')){
        account.password = await bcrypt.hash(account.password,8);
    }
    next();
});

// Generate an auth token for the user
accountSchema.methods.generateToken = async function(){
    var account = this;
    var token = jwt.sign({_id:account._id}, process.env.JWT_KEY);
    return token
}

// Search for a user by email and password.
accountSchema.statics.findByCredentials = async function(accountInfor) {
    var account = await Account.findOne({email: accountInfor.email})
    if (!account) {
        throw new Error({ error: responseObj.MESSAGE.LOGIN_FAILED })
    }
    var isPasswordMatch = await bcrypt.compare(accountInfor.password, account.password)
    if (!isPasswordMatch) {
        throw new Error({ error: responseObj.MESSAGE.LOGIN_FAILED })
    }
    return account
}

var Account = mongoose.model('Account',accountSchema);

var Exporter = Account;

module.exports = Exporter;