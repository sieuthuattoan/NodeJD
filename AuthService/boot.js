require('./config/dbConfig');
var bodyParser = require('body-parser');

const express = require('express');
const app = express();
const router = require("./routes");

var port = process.env.PORT || 8080;
app.use(express.json());
//app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());

app.use("/api",router);

app.listen(port, () => {
    console.log('Auth service is running...');
}) 