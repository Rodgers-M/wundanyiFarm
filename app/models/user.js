var mongoose      =   require('mongoose');
var bcrypt       =   require('bcryptjs')
var crypto        =   require('crypto');
var Schema        =   mongoose.Schema;

var userSchema    = Schema({
  local: {
      username  :  { type: String, index: true },
      firstname :  { type: String },
      lastname  :  { type: String },
      password  :  { type: String },
      email     :  { type: String }

       }
});

// create the model for users and expose it to our app
var User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserByUsername = function(username, callback){
  User.findOne(username, callback);
};


module.exports.createUser = function(newUser,callback){
  bcrypt.genSalt(10,function(err,salt){
    if(err) throw err;
    bcrypt.hash(newUser.password,salt,function(err,hash){
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};
