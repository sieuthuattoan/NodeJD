//Initialize epress router
let router = require('express').Router();
var userController = require('../controllers/userController');

router.use((req,res,next)=>{
    req.taothich = "ok";
    next();
});

//Set default response
router.get('/',(req,res)=>{
    res.json({
        status:'200',
        message:'You are at api root',
        bypassrequest: req.taothich
    });
});

//user routes
router.route('/users')
    .get(userController.index)
    .post(userController.create)

router.route('/users/:user_id')
    .get(userController.read)
    .put(userController.update)
    .patch(userController.update)
    .delete(userController.delete);

//test routes
router.route('/test')
    .get(userController.test)

//Export API routes
module.exports = router;