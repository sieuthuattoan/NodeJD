const resObj = {
    STATUS:{
        SUCCESS: "success",
        ERROR: "error",
        WARNING: "warning",
    },
    MESSAGE:{
        OK:"ok",

        ACCESS_FAILED: "Access failed! Check authentication credentials",
        LOGIN_FAILED: "Login failed! Check authentication credentials",
        LOGIN_SUCCESS: "Login success!",
        INVALID_EMAIL: "Invalid email address",
        EMAIL_NOT_FOUND: "The email has not registered yet!!",
        LOGOUT_SUCCESS: "This account has been logged out",
        LOGOUTALL_SUCCESS: "All devices have been logged out",
        VERIFICATION_CODE_INVALID: "Invalid code",
        VERIFICATION_CODE_EXPIRED: "Code has been expired, we sent to you a new code",

        USER_PROFILE_UPDATED: "User profile has been updated",
        USER_PROFILE_NOT_FOUND: "User profile not found! please create a new profile for this account",
        USER_PROFILE_CREATED: "User profile has been created",
    }
}

var Exporter = resObj;

module.exports = Exporter;