//import user model
var User = require('../models/userModel');
const debug = require('debug')('controller-debugger');


//---Test section---
var test = (req,res)=>{
    var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve({
            message: "promise done",
            code: "pdone"
        });
        //console.log(promise);
    }, 5 * 1000);
    });
    promise.then(result=>{
      console.log(result)  ;
    })
    res.json({
        status:"ok for now"
    });
}
//---End test section---




//index action
var index = (req,res) => {
    User.get((err, user) => {
        if(err){
            res.json({
                status:"error",
                message: err,
            });
        }
        res.json({
            status:"success",
            message:"There is nothing wrong",
            data: user
        });
    });
}

//create action
var createUser = (req, res)=>{
    var user = new User();
    user.name = req.body.name ? req.body.name : contact.name;
    user.email = req.body.email;

    // save the contact and check for errors
    user.save((err) => {
        if (err){
            res.json({
                status:"error",
                message: err,
            });
        }
        res.json({
            message: 'The user created!',
            data: user
        });
    });
}

//read action
var readUser = (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
        if (err){
            res.json({
                status:"error",
                message: err,
            });
        }
        res.json({
            message: 'User Info updated',
            data: user
        });
    });
}

//update action
var updateUser = (req, res)=>{
    User.findById(req.params.user_id, (err, user)=>{
        if (err){
            res.json({
                status:"error",
                message: err,
            });
        }
        user.name = req.body.name ? req.body.name : contact.name;
        user.email = req.body.email;
        // save the user and check for errors
        user.save((err) => {
            if (err){
                res.json({
                    status:"error",
                    message: err,
                });
            }
            res.json({
                message: 'User Info updated',
                data: user
            });
        }); 
    });
}

//delete action
var deleteUser = (req, res)=>{
    User.remove(req.params.user_id, (err, contact) => {
        if (err){
            res.json({
                status:"error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: 'User deleted'
        });
    });
}

exports.index = index;
exports.create = createUser;
exports.update = updateUser;
exports.delete = deleteUser;
exports.read = readUser;
exports.test = test;