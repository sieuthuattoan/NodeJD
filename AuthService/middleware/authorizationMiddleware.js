const Jwt = require('jsonwebtoken');
const AccountModel = require('../models/accountModel');
const ResponseObj = require('../config/responseMsgConfig');

var authorize = async(req,res,next)=>{
    var token = req.header('Authorization').replace('Bearer ','');
    var data = Jwt.verify(token,process.env.JWT_KEY);
    try{
        var account = await AccountModel.findOne({_id: data._id, tokens: token});
        if(!account){
            res.json({
                status: ResponseObj.STATUS.ERROR,
                message: ResponseObj.MESSAGE.ACCESS_FAILED
            })
        }else{
            req.LoggingInAccount = account;
            req.LoggingInToken = token;
            next();
        }
    }
    catch(err){
        res.json({
            status: ResponseObj.STATUS.ERROR,
            message:err.message
        });
    }
}

var Exporter = {
    authorize: authorize
}

module.exports = Exporter;