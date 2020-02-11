//Initialize epress router
let router = require('express').Router();
var userController = require('../controllers/userController');

//Set default response
router.get('/',function(req,res){
    res.json({
        status:'200',
        message:'You are at api root'
    });
});

//user routes
router.route('/users')
    .get(userController.index)
    .post(userController.create);

router.route('/users/:user_id')
    .get(userController.read)
    .put(userController.update)
    .patch(userController.update)
    .delete(userController.delete);

//Export API routes
module.exports = router;