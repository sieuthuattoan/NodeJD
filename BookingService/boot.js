require('./config/dbConfig');

let bodyParser = require('body-parser');
let Router = require('./routes');
const express = require('express');
const app = express();

var port = process.env.PORT || 8080;

app.use(express.json());

app.use('/booking', Router);

app.listen(port, () => {
    console.log("Booking service is running port " + port);
});