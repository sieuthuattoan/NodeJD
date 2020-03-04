const mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
    booking_id: {
        type: String,
        required: true 
    },
    client_id:      { type: String, required: true },
    booking_time:   {
        type: Date,
        required: true 
    },
    start_date:     { type: Date, required: true },
    end_date:       { type: Date, required: true },
    child_count:    { type: Number },
    coupon:         { type: String },
    cost:           { type: Number, required: true },
    extra_cost:     { type: Number, required: true },
    payment_amount: { type: Number },
    payment_type:   { type: String },
    payment_success:{ type: String, required: true },
    special_request:{ type: String },
    is_deleted:     { type: Number, required: true }
});

var bookingModel = module.exports = mongoose.model('booking', bookingSchema);