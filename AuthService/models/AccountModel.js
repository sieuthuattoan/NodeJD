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
    account.tokens = account.tokens.concat({token})
    await account.save()
    return token
}

// Search for a user by email and password.
accountSchema.statics.findByCredentials = async function(email, password) {
    var account = await Acc.findOne({ email} )
    if (!account) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    var isPasswordMatch = await bcrypt.compare(password, account.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return account
}

var Exporter = mongoose.model('Account',accountSchema);

module.exports = Exporter;