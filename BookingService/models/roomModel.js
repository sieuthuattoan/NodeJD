const mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
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
        children: { type: Number, required: true }
    },
    total: {
        type: String,
        required: true
    },
    is_book: {
        type: Number,
        required: true
    }
});
mongoose.model('Room', roomSchema);