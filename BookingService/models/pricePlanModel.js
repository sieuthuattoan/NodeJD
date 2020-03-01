const mongoose = require('mongoose');

var pricePlan = mongoose.Schema({
    id: { type: String, required: true },
    room_id: { type: Number },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    sun: { type: Number },
    mon: { type: Number },
    tue: { type: Number },
    wed: { type: Number },
    thu: { type: Number },
    fri: { type: Number },
    sat: { type: Number },
    default: { type: Number, required: true }
});

var pricePlanModel = module.exports = mongoose.model('price_plan', pricePlan);