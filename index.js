let express = require('express');
let app = express();
let debug = require('debug')('debugger');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let apiRoutes = require('./api-routes');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api',apiRoutes)


// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/27017', { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

var port = process.env.PORT || 3000;

app.listen(port, () => {
    debug('The app has been started on port',port);
    console.log('Service is running well..');
})