var mongoose      =   require('mongoose');
var Schema        =   mongoose.Schema;
//var User          =   require('./user');
var animalSchema = new Schema({
  species      : {type : String},
  gender       : {type : String},
  tagnum       : {type : String, unique : true},
  date         : {type : Date, default : Date.now}
//owner        : [{type: Schema.Types.ObjectId, ref: 'User' }]// reference to the user model
});

module.exports = mongoose.model('Animal', animalSchema);
