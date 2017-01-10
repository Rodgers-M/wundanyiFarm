var passport = require('passport');

module.exports ={
  new : function(req, res){
    res.render('login', {
        message: req.flash('loginMessage'),
        title: "Login Page"
    });
  },

  create : function(req, res){
    res.send('hello');
  },

  delete : function(req, res){
    req.logout();
    res.redirect('/');
   req.session.destroy();
  }
};
