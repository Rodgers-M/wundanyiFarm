var mongoose      =   require('mongoose');
var bcrypt        =   require('bcrypt-nodejs')
var crypto        =   require('crypto');
var Schema        =   mongoose.Schema;
var Role		  =  require('./roles');	
var Animal		  =  require('./animal');
var FarmInput	  =  require('./farminput');

var userSchema    = new Schema({
  local: {
      username  :  { type: String },
      firstname :  { type: String },
      lastname  :  { type: String },
      password  :  { type: String },
      email     :  { type: String },
	  role		:  [{type: Schema.Types.ObjectId, ref:Role }]
       }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

//delete all documents referenced to the user before deleteing the user
//this will prevent deletion anomalies
userSchema.post('findOneAndRemove', function(user){
	console.log(user);
	Animal.remove({'owner'	 	 : user.local.username}).exec();
	Health.remove({'createdby'	 :  user.local.username}).exec();
	FarmInput.remove({'owner'	 : user.local.username}).exec();
});
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
