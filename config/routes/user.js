var User          = require('../../app/models/user');

module.exports ={
  new : function(req, res){
    res.render('signup', {
      //  message : req.flash('signupMessage'),
      //  title   : "Sign Up"
    });
  },

};
