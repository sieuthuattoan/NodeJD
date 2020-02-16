require('./config');


const express = require('express');
const app = express();

var port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Booking service is running");
});