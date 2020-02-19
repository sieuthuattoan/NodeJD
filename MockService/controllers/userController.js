//import user model
var User = require('../models/userModel');
const debug = require('debug')('controller-debugger');
const fetch = require('node-fetch');


//---Test section---
var test = (req,res)=>{
    console.clear();
    test2(res);
    //fetchUserDetailsWithStats(res);
}

    //--test promise
    var test1 = (res)=>{
        var promise = new Promise((resolve, reject) => {
            var t = 5;
            console.log("inside promise.");
            setTimeout(function() {
                var k = 8;
                setTimeout(function() {
                    resolve({
                        status:"done",
                        message: t+"*1000 + "+k+"*1000" ,
                    });
                }, k * 1000);
            }, t * 1000);
        });
        promise.then(result=>{
            res.json({
                result
            });
        })

        console.log("the end line of code.");
    }

    var test2 = (res)=>{
        console.log("start test2 at "+new Date());
        var promise = new Promise((resolve,resject)=>{
            fetch("https://api.github.com/users/nkgokul")
                .then(res => res.json())
                .then(data=> {
                    console.log("the fetch get the data at "+new Date());
                    resolve(data)
                })
        }).then(result=>{
            console.log("the promise got data from fetch at "+new Date());
            res.json({
                result
            });
        }).catch(err=>{
            res.json(
                err
            )
        })
        console.log("stop test2 at "+new Date());
    }

    //--test async await
    async function fetchUserDetailsWithStats(res) {
        i = 0;
        for (name of ["nkgokul", "BrendanEich", "gaearon"]) {
            i++;
            console.log("Starting API call " + i + " at " + new Date());
            userDetails = await fetch("https://api.github.com/users/" + name);
            userDetailsJSON = await userDetails.json();
            console.log("Finished API call " + i + " at " + new Date());
            console.log("userDetailsJSON: at "+new Date()+" : ", userDetailsJSON);
        }
        res.json({
            message:"ok"
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