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
	farminput.slug			= farminput.slugify(req.body.item);
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
		FarmInput.find({}, function(err, records){
			if(err) return(err);
			res.render('farminput/index',{
			page : 'farminput',
			records:records
		});
	});
		
	},
   edit : function(req, res){
   	FarmInput.findOne({'slug':req.params.slug}, function(err, input){
		if(err) return(err);
		res.render('farminput/edit',{
			page 	: 'farminput',
			input 	: input
		});
	});
   },
	update : function(req, res){
   		FarmInput.findOne({'slug':req.body.slug}, function(err, input){
			
			var totalcost = req.body.NumOfItems * req.body.itemprice;

			input.itemBought    = req.body.item || input.itemBought;
			input.slug			= input.slugify(req.body.item) || input.slug;
			input.NumOfItems    = req.body.NumOfItems || input.NumOfItems ;
			input.pricePerItem  = req.body.itemprice || input.pricePerItem;
			input.date          = req.body.date || input.date;
			input.owner         = req.user.username || input.owner;
			input.totalcost		= totalcost || input.totalcost;
			
			input.save(function(err, updatedinpt){
			 if(err) return(err);
			 req.flash('success', 'input update successfuly');
			 res.redirect('farminput');
			});
		})
	},
	delete : function(req, res){

	}
}
