const mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
    id: { 
        type:String, 
        required: true
    },
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    room_type: {
        // name: { type: String },
        adult: { type: Number, required: true },
        children: { type: Number, required: true },
        extra_bed: { type: Number, required: true }
    },
    total: {
        type: String,
        required: true
    },
    is_book: {
        type: Boolean,
        required: true
    }
});
// mongoose.model('Room', roomSchema);
var roomModel = module.exports = mongoose.model('room', roomSchema);