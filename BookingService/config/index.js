// load environment variables from .env
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('DB Connected!');
    }
});