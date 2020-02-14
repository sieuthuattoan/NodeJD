const express = require('express');
const app = express();
require('./config/db');

var port = process.env.PORT || 8080;

//app.use(express.json());

app.listen(port, () => {
    console.log('Auth service is running...');
})