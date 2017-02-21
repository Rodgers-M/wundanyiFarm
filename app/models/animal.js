var mongoose      =   require('mongoose');
var Schema        =   mongoose.Schema;

var animalSchema = new Schema({
  species      : {type : String},
  gender       : {type : String},
  tagnum       : {type : String, unique : true},
  date         : {type : Date, default : Date.now}
});

module.exports = mongoose.model('Animal', animalSchema);
