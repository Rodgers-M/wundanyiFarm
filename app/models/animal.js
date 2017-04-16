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

animalSchema.pre('remove', function(next){
	this.model('Health').remove({animal : this._id}, next);
	});	
module.exports = mongoose.model('Animal', animalSchema);
