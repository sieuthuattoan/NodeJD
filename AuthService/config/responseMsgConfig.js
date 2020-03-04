const resObj = {
    STATUS:{
        SUCCESS: "success",
        ERROR: "error",
        WARNING: "warning"
    },
    MESSAGE:{
        OK:"ok",

        ACCESS_FAILED: "Access failed! Check authentication credentials",
        LOGIN_FAILED: "Login failed! Check authentication credentials",
        LOGIN_SUCCESS: "Login success!",
        INVALID_EMAIL: "Invalid email address",
        LOGOUT_SUCCESS: "This account has been logged out",
        LOGOUTALL_SUCCESS: "All devices have been logged out",

        USER_PROFILE_UDATED: "User profile has been updated",
        USER_PROFILE_NOT_FOUND: "User profile not found! Make new a profile for this account please",
    }
}

var Exporter = resObj;

module.exports = Exporter;