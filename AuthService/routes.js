var router =  require("express").Router();
var authorizationMiddleware = require('./middleware/authorizationMiddleware');

var accountController = require("./controller/accountController");
var userProfileController = require("./controller/userProfileController");

router.use("/",(req,res,next)=>{
    next();
});

//auth route
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


//user profile route
router.route('/user/updateCurrent')
    .post(authorizationMiddleware.authorize, userProfileController.updateUser);

router.route('/user/readCurrent')
    .post(authorizationMiddleware.authorize, userProfileController.readUser);

module.exports = router;