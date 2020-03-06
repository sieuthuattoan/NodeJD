var Router =  require("express").Router();
var AuthorizationMiddleware = require('./middleware/authorizationMiddleware');

var AccountController = require("./controller/accountController");
var UserProfileController = require("./controller/userProfileController");

var email = require('./helpers/emailHelper');

Router.use("/",(req,res,next)=>{
    next();
});

Router.route("/test")
    .get(email.sendMail);

//auth route
Router.route("/")
    .get(AccountController.index);

Router.route("/activateAccount")
    .get(AccountController.activate);

Router.route("/register")
    .post(AccountController.register);

Router.route("/login")
    .get(AccountController.logIn);

Router.route("/logout")
    .put(AuthorizationMiddleware.authorize, AccountController.logOut)
    .patch(AuthorizationMiddleware.authorize, AccountController.logOut);

Router.route("/logoutall")
    .put(AuthorizationMiddleware.authorize, AccountController.logOutAll)
    .patch(AuthorizationMiddleware.authorize, AccountController.logOutAll);


//user profile route
Router.route('/user')
    .post(AuthorizationMiddleware.authorize, UserProfileController.createCurrentUser)
    .put(AuthorizationMiddleware.authorize, UserProfileController.updateCurrentUser)
    .patch(AuthorizationMiddleware.authorize, UserProfileController.updateCurrentUser)
    .get(AuthorizationMiddleware.authorize, UserProfileController.readCurrentUser);
    
module.exports = Router;