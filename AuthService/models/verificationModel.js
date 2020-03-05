var mongoose = require('mongoose');
var validator = require('validator');
const responseObj = require('../config/responseMsgConfig');

var verificationSchema = mongoose.Schema({
    code:{
        type: Number,
        require: true,
    },
    createdTime:{
        type: Date,
        require: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        validate: value=>{
            if(!validator.isEmail(value)){
                throw new Error({err: responseObj.MESSAGE.INVALID_EMAIL});
            };
        }
    }
});

// Search for a user by email and password.
verificationSchema.statics.checkCode = async function(codeObj) {
    try{
        var codes = await Code.find({
            email: codeObj.email,
            code: codeObj.code
        });

        if (!codes || codes.length===0) { //check if invalid
            return {
                status: responseObj.STATUS.WARNING,
                message: responseObj.MESSAGE.VERIFICATION_CODE_INVALID,
            }
        }
        codes = await codes.filter((value)=>{
            return value.createdTime >= codeObj.time;
        });
        if (!codes || codes.length===0) { //check if expired
            return {
                status: responseObj.STATUS.WARNING,
                message: responseObj.MESSAGE.VERIFICATION_CODE_EXPIRED,
            }
        }

        return {
            status: responseObj.STATUS.SUCCESS,
            message: responseObj.MESSAGE.OK,
        }
    }catch(err){
        return{
            status: responseObj.STATUS.ERROR,
            message:err.message
        };
    }
}

var Code = mongoose.model('Code',verificationSchema);

var Exporter = Code;

module.exports = Exporter;