var mongoose      =   require('mongoose');
var bcrypt        =   require('bcrypt-nodejs');
var Schema        =   mongoose.Schema;

var userSchema    = new Schema({
  local            : {
       email        : String,
       password     : String,
   }
});
