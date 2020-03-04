const mongoose = require('mongoose');

var carPickup = mongoose.Schema({
    id: {
        type: String,
        required: true 
    },
    car_type: {
        type: String
    },
    car_price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean
    }
});
var carPickupModel = module.exports = mongoose.model('car_pickup', carPickup);