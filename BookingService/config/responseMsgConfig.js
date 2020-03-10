const resObj = {
    STATUS:{
        SUCCESS: "success",
        ERROR: "error",
        WARNING: "warning",
    },
    MESSAGE:{
        OK:"ok",

        ACCESS_FAILED: "Access failed! Check authentication credentials",
        BOOK_FAILED: "Your're rooms book failed or somone has book ! Please choose other rooms",
        BOOK_SUCCESS: "Login success!",
        ORDER_SUCCESS: "",
        ORDER_FAILED: "",
        LIST_FAILED: ""

    },
    PROCESS:{
        ACTIVATE: "activate",
        RECOVERY: "recovery"
    }
}

var Exporter = resObj;

module.exports = Exporter;
