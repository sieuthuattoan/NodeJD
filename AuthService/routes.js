var router =  require("express").Router();

var accountController = require("./controller/accountController");

router.use("/",(req,res,next)=>{
    next();
});

router.route("/")
    .get(accountController.index);

router.route("/register")
    .post(accountController.register);

router.route("/login")
    .post(accountController.login);

module.exports = router;