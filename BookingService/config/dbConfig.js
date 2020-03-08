const Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost:27017/',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});