var mongoose      =   require('mongoose');
var Schema        =   mongoose.Schema;
var User          =   require('./user');

var farminputSchema = new Schema({
  itemBought       : {type : String},
  slug			   : {type : String},
  pricePerItem     : {type : Number},
  NumOfItems       : {type : Number},
  date             : {type : Date, default : Date.now},
  totalcost		   : {type :Number},
  owner			   : {type: String, ref: 'User' }// reference to the user model
});

farminputSchema.methods.slugify =  function(item) {
	 return item.toString().toLowerCase()
	 .replace(/\s+/g, '-')        // Replace spaces with -        
	 .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
	 .replace(/\-\-+/g, '-')      // Replace multiple - with single -
	 .replace(/^-+/, '')          // Trim - from start of text    
	 .replace(/-+$/, '');         // Trim - from end of text      
	 }; 
module.exports = mongoose.model('FarmInput', farminputSchema);
