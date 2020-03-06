var Mongoose = require('mongoose');
var Validator = require('validator');
const ResponseObj = require('../config/responseMsgConfig');
var Randomatic = require('randomatic');

var verificationSchema = Mongoose.Schema({
    code:{
        type: Number,
        require: true,
    },
    createdTime:{
        type: Date,
        require: true
    },
    process:{
        type: String,
        require: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        validate: value=>{
            if(!Validator.isEmail(value)){
                throw new Error({err: ResponseObj.MESSAGE.INVALID_EMAIL});
            };
        }
    }
});

// Search for a user by email and password.
verificationSchema.statics.checkCode = async function(codeObj) {
    try{
        var codes = await Code.find({
            email: codeObj.email,
            code: codeObj.code,
            process: codeObj.process
        });

        if (!codes || codes.length===0) { //check if invalid
            return {
                status: ResponseObj.STATUS.WARNING,
                message: ResponseObj.MESSAGE.VERIFICATION_CODE_INVALID,
            }
        }
        codes = await codes.filter((value)=>{
            return value.createdTime >= codeObj.time;
        });
        if (!codes || codes.length===0) { //check if expired
            return {
                status: ResponseObj.STATUS.WARNING,
                message: ResponseObj.MESSAGE.VERIFICATION_CODE_EXPIRED,
            }
        }

        return {
            status: ResponseObj.STATUS.SUCCESS,
            message: ResponseObj.MESSAGE.OK,
        }
    }catch(err){
        return{
            status: ResponseObj.STATUS.ERROR,
            message:err.message
        };
    }
}

verificationSchema.statics.generateCode = async function(email, process){
    try{
        var verifiedCode = Randomatic('0',6);
        var verification = new VerificationModel({
            email: email,
            code: verifiedCode,
            process: process,
            createdTime: new Date()
        });
        await verification.save();
        return {
            status: ResponseObj.STATUS.SUCCESS,
            message: ResponseObj.MESSAGE.OK,
            code: verifiedCode
        };
    }
    catch(err){
        return {
            status: ResponseObj.STATUS.ERROR,
            message: err.message,
            code: null
        };
    }
}

var VerificationModel = Mongoose.model('Verification',verificationSchema);

var Exporter = VerificationModel;

module.exports = Exporter;