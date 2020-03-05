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

router.route("/activateAccount")
    .get(accountController.activate);

router.route("/register")
    .post(accountController.register);

router.route("/login")
    .get(accountController.logIn);

router.route("/logout")
    .put(authorizationMiddleware.authorize, accountController.logOut)
    .patch(authorizationMiddleware.authorize, accountController.logOut);

router.route("/logoutall")
    .put(authorizationMiddleware.authorize, accountController.logOutAll)
    .patch(authorizationMiddleware.authorize, accountController.logOutAll);


//user profile route
router.route('/user')
    .post(authorizationMiddleware.authorize, userProfileController.createCurrentUser)
    .put(authorizationMiddleware.authorize, userProfileController.updateCurrentUser)
    .patch(authorizationMiddleware.authorize, userProfileController.updateCurrentUser)
    .get(authorizationMiddleware.authorize, userProfileController.readCurrentUser);
    
module.exports = router;