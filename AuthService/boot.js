require('./config/dbConfig');
var BodyParser = require('body-parser');

const Express = require('express');
const App = Express();
const Router = require("./routes");

var port = process.env.PORT || 8080;
App.use(Express.json());
//app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());

App.use("/api",Router);

App.listen(port, () => {
    console.log('Auth service is running...');
})