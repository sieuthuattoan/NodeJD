const Account = require('../models/AccountModel');
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
        var account =  new Account(req.body);
        await account.save();
        var token =  await account.generateToken();
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

var login = async(req,res) => {
    //login
    try{
        const accountInfor = {
            email : req.body.email,
            password : req.body.password
        }
        const accountLogin = await Account.findByCredentials(accountInfor);
        if (!accountLogin) {
            return res.json({
                status: responseObj.STATUS.ERROR,
                message: responseObj.MESSAGE.LOGIN_FAILED
            })
        }
        const token = await accountLogin.generateToken()
        res.json({ 
            status: responseObj.STATUS.SUCCESS,
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

var Exporter = {
    index:index,
    register: register,
    login: login
}

module.exports = Exporter;