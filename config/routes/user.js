var passport   =  require('passport');
var User          = require('../../app/models/user');
module.exports ={
  new : function(req, res){
    res.render('signup', {
       message : req.flash('signupMessage'),
       title   : "Sign Up"
    });
  },
  create : function(req, res, next){
    passport.authenticate('local-signup',{
      successRedirect : '/viewanimals',
      failureRedirect : '/signup',
      failureFlash : true // allow flash messages
    })(req, res, next);
  }
};
