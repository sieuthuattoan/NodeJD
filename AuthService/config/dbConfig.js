const Mongoose = require('mongoose');

Mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});