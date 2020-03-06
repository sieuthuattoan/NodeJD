const UserModel = require('../models/userProfileModel');
const ResponseObj = require('../config/responseMsgConfig');


var createCurrentUser= async(req,res)=>{
    try{
        var accountId = req.LoggingInAccount.id;
        user = new UserModel(req.body.user);
        user.accountId = accountId;
        user.createdDate = new Date();
        await user.save();
        res.json({
            status: ResponseObj.STATUS.SUCCESS,
            message:ResponseObj.MESSAGE.USER_PROFILE_CREATED
        });
    }catch(err){
        res.json({
            status: ResponseObj.STATUS.ERROR,
            message:err.message
        });
    }
}

var updateCurrentUser= async(req,res)=>{
    try{
        var accountId = req.LoggingInAccount.id;
        var user = await UserModel.findOne({accountId: accountId});
        if(!user){
            res.json({
                status: ResponseObj.STATUS.WARNING,
                message:ResponseObj.MESSAGE.USER_PROFILE_NOT_FOUND
            });
        }else{
            user.firstName = req.user.firstName ? req.user.firstName : user.firstName;
            user.lastName = req.user.lastName ? req.user.lastName : user.lastName;
            user.addressName = req.user.addressName ? req.user.addressName : user.addressName;
            user.birthDate = req.user.birthDate ? req.user.birthDate : user.birthDate;
            user.updatedDate = new Date();
            await user.save();
            res.json({
                status: ResponseObj.STATUS.SUCCESS,
                message:ResponseObj.MESSAGE.USER_PROFILE_UPDATED
            });
        }
    }catch(err){
        res.json({
            status: ResponseObj.STATUS.ERROR,
            message:err.message
        });
    }
}

var readCurrentUser= async(req,res)=>{
    try{
        var accountId = req.LoggingInAccount.id;
        var user = await UserModel.findOne({accountId: accountId});
        if(!user){
            res.json({
                status: ResponseObj.STATUS.WARNING,
                message:ResponseObj.MESSAGE.USER_PROFILE_NOT_FOUND
            });
        }else{
            res.json({
                status: ResponseObj.STATUS.SUCCESS,
                message:ResponseObj.MESSAGE.OK,
                userProfile: user
            });
        }
    }catch(err){
        res.json({
            status: ResponseObj.STATUS.ERROR,
            message:err.message
        });
    }
}

var Exporter = {
    updateCurrentUser: updateCurrentUser,
    readCurrentUser: readCurrentUser,
    createCurrentUser: createCurrentUser,
}

module.exports = Exporter;