const AccountModel = require('../models/accountModel');
const responseObj = require('../config/responseMsgConfig');

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
        var account =  new AccountModel(req.body);
        var token =  await account.generateToken();
        account.tokens.push(token);
        await account.save();
        
        res.json({
            status: responseObj.STATUS.SUCCESS,
            account: account
        });
    }
    catch(err){
        console.log(err);
        res.json({
            status: responseObj.STATUS.ERROR,
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
        const accountLogin = await AccountModel.findByCredentials(accountInfor);
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

var Exporter = {
    index:index,
    register: register,
    logIn: logIn,
    logOut: logOut,
    logOutAll: logOutAll,
}

module.exports = Exporter;