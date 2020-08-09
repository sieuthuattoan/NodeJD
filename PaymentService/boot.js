var express = require('express');

var payment = express();
payment.listen(3001, () => {
    console.log('Server running...'); 
});