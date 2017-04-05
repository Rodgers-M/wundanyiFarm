var FarmInput = require('../../app/models/farminput');
module.exports = {
  new : function(req, res){
	res.render('farminput/new',{
		page : 'farminput'
	});
  },
  create : function(req, res){
    var  farminput = new FarmInput();

    farminput.itemBought    = req.body.item;
    farminput.NumOfItems    = req.body.NumOfItems;
    farminput.pricePerItem  = req.body.price;
    farminput.date          = req.body.date;
    farminput.owner         = req.user._id;

    farminput.save(function(err, record){
      if(err) return err;
      req.flash('success', 'record saved successfuly');
      res.redirect('/farminput');
      console.log(record);
    })
  }
}
