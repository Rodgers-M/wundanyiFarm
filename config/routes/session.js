var passport = require('passport');

module.exports ={
  new : function(req, res){
    res.render('login', {
        //message: req.flash('loginMessage'),
        //title: "Login Page"
    });
  },
};
