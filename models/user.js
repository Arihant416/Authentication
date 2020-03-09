var mongoose= require('mongoose'),
    passportLocalMongoose=require('passport-local-mongoose');

var UserSchema= new mongoose.Schema({
    username:String,
    password:String
});
//Plugin saves us from writing 10-15 additional lines of codes in our App.js file(Passport Js) saved us.
UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);

