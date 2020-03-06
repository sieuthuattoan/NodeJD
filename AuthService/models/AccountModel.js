const Mongoose = require('mongoose');
const Validator = require('validator');
const Bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const ResponseObj = require('../config/responseMsgConfig');

const accountSchema = Mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value=>{
            if(!Validator.isEmail(value)){
                throw new Error({err: ResponseObj.MESSAGE.INVALID_EMAIL});
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
        account.password = await Bcrypt.hash(account.password,8);
    }
    next();
});

// Generate an auth token for the user
accountSchema.methods.generateToken = async function(){
    var account = this;
    var token = Jwt.sign({_id:account._id}, process.env.JWT_KEY);
    return token
}

// Search for a user by email and password.
accountSchema.statics.findByCredentials = async function(accountInfor) {
    var account = await Account.findOne({email: accountInfor.email})
    if (!account) {
        throw new Error({ error: ResponseObj.MESSAGE.LOGIN_FAILED })
    }
    var isPasswordMatch = await Bcrypt.compare(accountInfor.password, account.password)
    if (!isPasswordMatch) {
        throw new Error({ error: ResponseObj.MESSAGE.LOGIN_FAILED })
    }
    return account
}

var AccountModel = Mongoose.model('Account',accountSchema);

var Exporter = AccountModel;

module.exports = Exporter;