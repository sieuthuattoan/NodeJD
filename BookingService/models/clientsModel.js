const mongoose = require('mongoose');

var clientSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    sur_name: {
        type: String,
        required: true
    },
    // chuc danh, xung ho: Mr., Ms.,..
    title: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true 
    },
    city: {
        type: String,
        required: true 
    },
    province: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true 
    },
    country: {
        type: String,
        required: true 
    },
    phone: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },
    // khach quen ?
    existing: {
        type: Boolean,
        required: true 
    }
});

var clientModel = module.exports = mongoose.model('client', clientSchema);