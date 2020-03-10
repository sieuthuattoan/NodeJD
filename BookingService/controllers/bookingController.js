// const io = require('socket.io')(app);
var Booking = require('../models/bookingModel');
var Room = require('../models/roomModel');

var index = (req, res) => {
    Room.find((error, results) => {
        if(!error) {
            res.json({
                status: 'success',
                data: results,
                message: 'List room'
            })
        }
    }).limit(10);
    res.send('hello world');
}
var check = (req, res) => {
    
}

var booking = (req, res) => {

}

var Exports = {
    index : index,
    booking: booking
};

module.exports = Exports;
