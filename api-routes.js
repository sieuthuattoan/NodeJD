//Initialize epress router
let router = require('express').Router();

//Set default response
router.get('/',function(req,res){
    res.json({
        status:'200',
        message:'You are at api root'
    });
});

router.get('/getUser',function(req,res){
    res.json({
        status:'200',
        message:'You are at get User'
    });
});

//Export API routes
module.exports = router;