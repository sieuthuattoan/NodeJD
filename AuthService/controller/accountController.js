const ResponseObj = require('../config/responseMsgConfig');
const AccountBusiness = require('../business/accountBusiness');

//index
var index = (req, res) => {
    res.json({
        status: ResponseObj.STATUS.SUCCESS,
        message: "you are at the index"
    });
}

//register an account
var register = async (req, res) => {
    try{
        var newAccountObj = req.body;
        var result = await AccountBusiness.registerBusiness(newAccountObj);
        res.json(result);
    }
    catch(err){
        res.json({
            status: ResponseObj.STATUS.ERROR,
            message:err.message
        });
    }
}

//activata account
var activate = async(req,res) => {
    try{
        var time = new Date();
        time.setMinutes( time.getMinutes() - process.env.VERIFICATION_DURATION);
        var codeObj = {
            email: req.body.email,
            code: req.body.code,
            time: time,
            process: ResponseObj.PROCESS.ACTIVATE
        }

        var result = await AccountBusiness.activateBusiness(codeObj);
        res.json(result);
    }catch(err){
        res.json({
            status: ResponseObj.STATUS.ERROR,
            message:err.message
        });
    }
}

//login
var logIn = async(req,res) => {
    try{
        const accountInfor = {
            email : req.body.email,
            password : req.body.password
        }

        var result = AccountBusiness.logInBusiness(accountInfor);
        res.json(result);

    }catch(err){
        res.json({
            status: ResponseObj.STATUS.ERROR,
            message:err.message
        });
    }
}

//log the current device out 
////LoggingInAccount and LoggingInToken have been set at the authorization middleware
var logOut = async(req,res)=>{
    try{
        var accountInfor = {
            LoggingInAccount: req.LoggingInAccount,
            LoggingInToken: req.LoggingInToken
        }
        var result = AccountBusiness.logOutBusiness(accountInfor);
        res.json(result);
    }catch(err){
        res.json({
            status: ResponseObj.STATUS.ERROR,
            message:err.message
        });
    }
}

//log all devices out 
////LoggingInAccount and LoggingInToken have been set at the authorization middleware
var logOutAll = async(req,res)=>{
    try{
        var accountInfor = {
            LoggingInAccount: req.LoggingInAccount
        }
        var result = AccountBusiness.logOutAllBusiness(accountInfor);
        res.json(result);

    }catch(err){
        res.json({
            status: ResponseObj.STATUS.ERROR,
            message:err.message
        });
    }
}

//recovery account
var recoverySetVerifiedCode = async(req,res) => {
    try{
        var recoveryObj = {
            email: req.body.email,
        }
        var result = AccountBusiness.recoverySetVerifiedCodeBusiness(recoveryObj);
            res.json(result);

    }catch(err){
        res.json({
            status: ResponseObj.STATUS.ERROR,
            message:err.message
        });
    }
}

var recoveryGenerateNewPassword = async(req,res) => {
    try{
        var recoveryObj = {
            email: req.body.email,
            verifiedCode: req.body.code
        }
        var result = AccountBusiness.recoveryGenerateNewPasswordBusiness(recoveryObj);
            res.json(result);

    }catch(err){
        res.json({
            status: ResponseObj.STATUS.ERROR,
            message:err.message
        });
    }
}

var Exporter = {
    index:index,
    register: register,
    logIn: logIn,
    logOut: logOut,
    logOutAll: logOutAll,
    activate: activate,
    recoveryGenerateNewPassword: recoveryGenerateNewPassword,
    recoverySetVerifiedCode: recoverySetVerifiedCode
}

module.exports = Exporter;