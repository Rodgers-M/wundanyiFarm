var mongoose      =   require('mongoose');
var Schema        =   mongoose.Schema;
var User          =   require('./user');

var farminputSchema = new Schema({
  itemBought       : {type : String},
  pricePerItem     : {type : Number},
  NumOfItems       : {type : Number},
  date             : {type : Date, default : Date.now},
  owner			   : {type: String, ref: 'User' }// reference to the user model
});

module.exports = mongoose.model('FarmInput', farminputSchema);
