const Account = require('../models/AccountModel');

//index
var index = (req, res) => {
    res.send("you are at the index");
}

//register an account
var register = async (req, res) => {
    try{
        var account =  new Account(req.body);
        await account.save();
        var token =  await account.generateToken();
        res.send(account);
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}

var Exporter = {
    index:index,
    register: register
}

module.exports = Exporter;