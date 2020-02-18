//require('./config/dbConfig');

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let apiRoutes = require('./route/api-routes');
const debug = require('debug')('boot-debugger');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api',apiRoutes)

var port = process.env.PORT || 8080;

app.listen(port, () => {
    debug('The app has been started on port',port);
    console.log('Service is running well..');
})