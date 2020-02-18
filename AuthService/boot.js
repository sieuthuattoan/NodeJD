require('./config/dbConfig');

const express = require('express');
const app = express();

var port = process.env.PORT || 8080;

//app.use(express.json());

app.listen(port, () => {
    console.log('Auth service is running...');
})