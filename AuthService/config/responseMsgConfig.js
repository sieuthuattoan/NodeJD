const resObj = {
    STATUS:{
        SUCCESS: "success",
        ERROR: "error",
        WARNING: "warning"
    },
    MESSAGE:{
        ACCESS_FAILED: "Access failed! Check authentication credentials",
        LOGIN_FAILED: "Login failed! Check authentication credentials",
        LOGIN_SUCCESS: "Login success!",
        INVALID_EMAIL: "Invalid email address",
        LOGOUT_SUCCESS: "This account has been logged out",
        LOGOUTALL_SUCCESS: "All devices have been logged out",
    }
}

var Exporter = resObj;

module.exports = Exporter;