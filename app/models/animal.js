var mongoose      =   require('mongoose');
var Schema        =   mongoose.Schema;
var User          =   require('./user');
var Health		  =   require('./health');
var animalSchema = new Schema({
  species      : {type : String},
  gender       : {type : String},
  tagnum       : {type : String, unique : true},
  date         : {type : Date, default : Date.now},
  owner        : {type: String, ref: 'User' }// reference to the user model
});

animalSchema.post('findOneAndRemove', function(animal){
	Health.remove({'animal'	 : animal._id}).exec();
});
module.exports = mongoose.model('Animal', animalSchema);
