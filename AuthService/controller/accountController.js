const accountModel = require('../models/accountModel');
const verificationModel = require('../models/verificationModel');

const responseObj = require('../config/responseMsgConfig');
var randomatic = require('randomatic');

//index
var index = (req, res) => {
    res.json({
        status: responseObj.STATUS.SUCCESS,
        message: "you are at the index"
    });
}

//register an account
var register = async (req, res) => {
    try{
        var account =  new accountModel(req.body);
        var token =  await account.generateToken();
        account.tokens.push(token);
        account.createdDate = new Date();
        await account.save();
        var verificationObj = await setVerifiedCode(account.email);
        res.json({
            status: responseObj.STATUS.SUCCESS,
            account: account,
            verificationInfor:{
                status: verificationObj.status,
                message: verificationObj.message,
                code: verificationObj.code
            } 
        });
    }
    catch(err){
        res.json({
            status: responseObj.STATUS.ERROR,
            message:err.message
        });
    }
}

//recovery account
var recover = async(req,res) => {

}

//activata account
var activate = async(req,res) => {
    var time = new Date();
    time.setMinutes( time.getMinutes() - process.env.VERIFICATION_DURATION);
    var codeObj = {
        email: req.body.email,
        code: req.body.code,
        time: time
    }
    var result = await verificationModel.checkCode(codeObj);

    switch(result.status){
        case responseObj.STATUS.SUCCESS:
                try{ 
                    await accountModel.where({email:codeObj.email}).updateOne({isActivated:true});
                }catch(err){
                    result = {
                        status: responseObj.STATUS.ERROR,
                        message: err.message
                    }
                }
            break;
        case responseObj.STATUS.WARNING: 
                if(result.message===responseObj.MESSAGE.VERIFICATION_CODE_EXPIRED)
                    var generatingNew = await setVerifiedCode(codeObj.email);
                    result.code = generatingNew.code;
            break;
        default: 
        break;
    }
    res.json(result);
}

//login
var logIn = async(req,res) => {
    try{
        const accountInfor = {
            email : req.body.email,
            password : req.body.password
        }
        const accountLogin = await accountModel.findByCredentials(accountInfor);
        if (!accountLogin) {
            return res.json({
                status: responseObj.STATUS.ERROR,
                message: responseObj.MESSAGE.LOGIN_FAILED
            })
        }
        var token = await accountLogin.generateToken()
        accountLogin.tokens.push(token);
        await accountLogin.save();
        res.json({ 
            status: responseObj.STATUS.SUCCESS,
            message: responseObj.MESSAGE.LOGIN_SUCCESS,
            accountLogin: accountLogin, 
            token: token 
        })
    }catch(err){
        res.json({
            status: responseObj.STATUS.ERROR,
            message:err.message
        });
    }
}

//log the current device out 
////LoggingInAccount and LoggingInToken have been set at the authorization middleware
var logOut = async(req,res)=>{
    try{
        req.LoggingInAccount.tokens = req.LoggingInAccount.tokens.filter((value)=>{
            return value != req.LoggingInToken; //this returns a list of token which not match with req.LoggingInToken
        });
        await req.LoggingInAccount.save();
        res.json({
            status: responseObj.STATUS.SUCCESS,
            message: responseObj.MESSAGE.LOGOUT_SUCCESS,
        });
    }catch(err){
        res.json({
            status: responseObj.STATUS.ERROR,
            message:err.message
        });
    }
}

//log all devices out 
////LoggingInAccount and LoggingInToken have been set at the authorization middleware
var logOutAll = async(req,res)=>{
    try{
        req.LoggingInAccount.tokens.splice(0,req.LoggingInAccount.tokens.length);
        await req.LoggingInAccount.save();
        res.json({
            status: responseObj.STATUS.SUCCESS,
            message: responseObj.MESSAGE.LOGOUTALL_SUCCESS,
        });
    }catch(err){
        res.json({
            status: responseObj.STATUS.ERROR,
            message:err.message
        });
    }
}

//helper
var setVerifiedCode = async(email) => {  
    var checkAccountExists = accountModel.exists({email: email});
    if(!checkAccountExists){
        return {
            status: responseObj.STATUS.WARNING,
            message: responseObj.MESSAGE.EMAIL_NOT_FOUND,
            code: null
        };
    }else{
        var verifiedCode = randomatic('0',6);
        var verification = new verificationModel({
            email: email,
            code: verifiedCode,
            createdTime: new Date()
        });
        await verification.save();
        return {
            status: responseObj.STATUS.SUCCESS,
            message: responseObj.MESSAGE.OK,
            code: verifiedCode
        };
    }
}


var Exporter = {
    index:index,
    register: register,
    logIn: logIn,
    logOut: logOut,
    logOutAll: logOutAll,
    activate: activate
}

module.exports = Exporter;