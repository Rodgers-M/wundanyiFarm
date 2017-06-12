module.exports = {
  index : function(req, res){
      res.render('index'); //load the homepage

},
	status : function(req, res){
		res.render('admindashboard/farmstatus',
				{page : 'farmstatus'}
				);
	}
};
