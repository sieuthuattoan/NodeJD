const roomModel = require('../models/roomModel');
const responseObj = require('../config/responseMsgConfig');

var fetchData = async (req, res) => {
    roomModel.find((data, error) => {
        if(error) {
            res.json({
                status: responseObj.STATUS.ERROR,
                message: responseObj.MESSAGE.LIST_FAILED
            })
        }
    });
}
