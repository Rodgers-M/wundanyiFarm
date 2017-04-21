module.exports = {

	notfound : function(req, res, next){
		res.status(404).send("this page is not available, try home");
	}
};
