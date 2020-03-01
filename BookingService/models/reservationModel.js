const mongoose = require('mongoose');

var reservationSchema = mongoose.Schema({
    bookings_id: {
        type: String,
        required: true 
    },
    room_id: {
        type: String,
        required: true 
    },
    number_room: {
        type: Number,
        required: true
    }
});

var reservationModel = module.exports = mongoose.model('reservation', reservationModel);