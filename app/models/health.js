var mongoose      =   require('mongoose');
var Schema        =   mongoose.Schema;
var Animal        =   require('./animal');
var User        =   require('./user');
var healthSchema = new Schema({
  disease           : {type : String},
  diagnosedate      : {type : Date, default : Date.now},
  totalcost         : {type : Number},
  nextdose          : {type : Date},
  animal            : [{type: Schema.Types.ObjectId, ref: 'Animal' }],
  createdby         : {type: String, ref: 'User' }
});

module.exports = mongoose.model('Health', healthSchema);
