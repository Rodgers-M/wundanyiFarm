var FarmInput = require('../../app/models/farminput');
module.exports = {
  new : function(req, res){
	res.render('farminput/new',{
		page : 'farminput'
	});
  },
  create : function(req, res){
	var totalcost = req.body.NumOfItems * req.body.itemprice;
    var  farminput = new FarmInput();

    farminput.itemBought    = req.body.item;
    farminput.NumOfItems    = req.body.NumOfItems;
    farminput.pricePerItem  = req.body.itemprice;
    farminput.date          = req.body.date;
    farminput.owner         = req.user.username;
	farminput.totalcost		= totalcost;
	console.log(farminput);
    farminput.save(function(error, record){
      if(error) return(error);
      req.flash('success', 'record saved successfuly');
      res.redirect('/farminput');
      console.log(record);
    });
  },
	index : function(req, res){
		var records = [];
		res.render('farminput/index',{
		 page : 'farminput',
		records:records
		});
	}
}
