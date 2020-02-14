//mongo
var mongoose = require('mongoose');

//setup schema
var userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    create_date:{
        type:Date,
        default:Date.now
    },
});

//Export the model
var userMongo = module.exports = mongoose.model('user',userSchema);

//modifing the finding function of mongoose => map it into the .get function
module.exports.get = function(callback, limit){
    //call the find of mongoose
    userMongo.find(callback).limit(limit);
}


