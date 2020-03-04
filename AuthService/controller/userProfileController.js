const userModel = require('../models/userProfileModel');
const responseObj = require('../config/responseMsgConfig');

var updateCurrentUser= async(req,res)=>{
    try{
        var accountId = req.LoggingInAccount.id;
        var user = await userModel.findOne({accountId: accountId});
        if(!user){
            user = new userModel(req.body.user);
            user.accountId = accountId;
        }else{
            user.firstName = req.user.firstName ? req.user.firstName : user.firstName;
            user.lastName = req.user.lastName ? req.user.lastName : user.lastName;
            user.addressName = req.user.addressName ? req.user.addressName : user.addressName;
            user.birthDate = req.user.birthDate ? req.user.birthDate : user.birthDate;
        }
        await user.save();
        res.json({
            status: responseObj.STATUS.SUCCESS,
            message:responseObj.MESSAGE.USER_PROFILE_UDATED
        });
    }catch(err){
        res.json({
            status: responseObj.STATUS.ERROR,
            message:err.message
        });
    }
}

var readCurrentUser= async(req,res)=>{
    try{
        var accountId = req.LoggingInAccount.id;
        var user = await userModel.findOne({accountId: accountId});
        if(!user){
            res.json({
                status: responseObj.STATUS.WARNING,
                message:responseObj.MESSAGE.USER_PROFILE_NOT_FOUND
            });
        }else{
            res.json({
                status: responseObj.STATUS.SUCCESS,
                message:responseObj.MESSAGE.OK,
                userProfile: user
            });
        }
    }catch(err){
        res.json({
            status: responseObj.STATUS.ERROR,
            message:err.message
        });
    }
}

var Exporter = {
    updateCurrentUser: updateCurrentUser,
    readCurrentUser: readCurrentUser
}

module.exports = Exporter;