// const io = require('socket.io')(app);
var Booking = require('../models/bookingModel');

var index = (req, res) => {
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