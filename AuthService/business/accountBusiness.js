const AccountModel = require('../models/accountModel');
var Randomatic = require('randomatic');
const ResponseObj = require('../config/responseMsgConfig');
const VerificationModel = require('../models/verificationModel');

var registerBusiness = async(newAccount)=>{
    var account =  new AccountModel(newAccount);
    var token =  await account.generateToken();
    account.tokens.push(token);
    account.createdDate = new Date();
    await account.save();
    var verificationResult = await setVerifiedCode(account.email,ResponseObj.PROCESS.ACTIVATE);

    return {
        status: ResponseObj.STATUS.SUCCESS,
        message: ResponseObj.MESSAGE.REGISTER_SUCCESS,
        verification_code: verificationResult
    }
    verificationResult;
}

var activateBusiness = async(codeObj)=>{
    var result = await VerificationModel.checkCode(codeObj);

    switch(result.status){
        case ResponseObj.STATUS.SUCCESS:
                try{ 
                    await AccountModel.where({email:codeObj.email}).updateOne({isActivated:true});
                }catch(err){
                    result = {
                        status: ResponseObj.STATUS.ERROR,
                        message: err.message
                    }
                }
            break;
        case ResponseObj.STATUS.WARNING: 
                if(result.message===ResponseObj.MESSAGE.VERIFICATION_CODE_EXPIRED)
                    var generatingNew = await AccountBusiness.setVerifiedCode(codeObj.email,ResponseObj.PROCESS.ACTIVATE);
                    //result.code = generatingNew.code;
            break;
        default: 
        break;
    }
    return result;
}

var logInBusiness = async(accountInfor)=>{
    const accountLogin = await AccountModel.findByCredentials(accountInfor);
    if (!accountLogin) {
        return {
            status: ResponseObj.STATUS.ERROR,
            message: ResponseObj.MESSAGE.LOGIN_FAILED
        };
    }
    var token = await accountLogin.generateToken()
    accountLogin.tokens.push(token);
    await accountLogin.save();
    return{ 
        status: ResponseObj.STATUS.SUCCESS,
        message: ResponseObj.MESSAGE.LOGIN_SUCCESS,
        accountLogin: accountLogin, 
        token: token 
    };
}

var logOutBusiness = async(accountInfor)=>{
    accountInfor.LoggingInAccount.tokens = accountInfor.LoggingInAccount.tokens.filter((value)=>{
        return value != accountInfor.LoggingInToken; //this returns a list of token which not match with req.LoggingInToken
    });
    await accountInfor.LoggingInAccount.save();
    return{
        status: ResponseObj.STATUS.SUCCESS,
        message: ResponseObj.MESSAGE.LOGOUT_SUCCESS,
    };
}

var logOutAllBusiness = async(accountInfor)=>{
    accountInfor.LoggingInAccount.tokens.splice(0,accountInfor.LoggingInAccount.tokens.length);
        await accountInfor.LoggingInAccount.save();
        return({
            status: ResponseObj.STATUS.SUCCESS,
            message: ResponseObj.MESSAGE.LOGOUTALL_SUCCESS,
        });
}

var recoverySetVerifiedCodeBusiness = async(accountInfor)=>{
    var result = await setVerifiedCode(accountInfor.email,ResponseObj.PROCESS.RECOVERY);
    return result;
}

var recoveryGenerateNewPasswordBusiness = async(accountInfor)=>{
    
}

//common func
var setVerifiedCode = async(email,process) => {  
    var checker = await AccountModel.exists({email: email});
    if(!checker){
        return {
            status: ResponseObj.STATUS.WARNING,
            message: ResponseObj.MESSAGE.EMAIL_NOT_FOUND,
        };
    }else{
        var result = VerificationModel.generateCode(email,process);
        if(result.status === ResponseObj.STATUS.SUCCESS){
            //todo: send email here
        }
        return result;
    }
}

var generateRandomPassword = async() => {
    var randomPassword = Randomatic('*',10);
    return randomPassword;
}

Exporter = {
    registerBusiness: registerBusiness,
    activateBusiness: activateBusiness,
    logInBusiness: logInBusiness,
    logOutBusiness: logOutBusiness,
    logOutAllBusiness: logOutAllBusiness,
    recoverySetVerifiedCodeBusiness: recoverySetVerifiedCodeBusiness,
    recoveryGenerateNewPasswordBusiness:recoveryGenerateNewPasswordBusiness
}
module.exports = Exporter