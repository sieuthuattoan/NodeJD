var router =  require("express").Router();
var authorizationMiddleware = require('./middleware/authorizationMiddleware');

var accountController = require("./controller/accountController");

router.use("/",(req,res,next)=>{
    next();
});

router.route("/")
    .get(accountController.index);

router.route("/register")
    .post(accountController.register);

router.route("/login")
    .post(accountController.logIn);

router.route("/logout")
    .post(authorizationMiddleware.authorize, accountController.logOut);

router.route("/logoutall")
    .post(authorizationMiddleware.authorize, accountController.logOutAll);

module.exports = router;