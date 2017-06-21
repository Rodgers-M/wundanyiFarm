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
      successRedirect : '/login',
      failureRedirect : '/signup',
      failureFlash : true // allow flash messages
    })(req, res, next);
  },
  index : function(req, res){
     User.find({}, function(error, users){
       if(error) res.send(error);
       res.render('admindashboard/users',{
           users  : users,
           page   : 'users'
       });
     });
   },
	delete :function(req, res){
		User.findOneAndRemove({'local.username' : req.params.user}, function(error, removedUser){
			if(error) return next(error);
			req.flash('success', 'User deleted successfully');
			res.redirect('/agrimonadmin');
		});
	
	},
	resetpage : function(req, res){
		res.render('passrecovery');
	},
	 reset : function(req, res){
          User.findOne({'local.username': req.body.username, 'local.email' : req.body.email },function(err, user){                                  
              if(err) return err;
              if(!user){
                req.flash("info", "Username and email don't match, Check and try again");                                                           
                res.redirect('/resetpass');   
              }else{
                user.local.password = user.generateHash(req.body.password);
                user.save(function(err, user){    
                  if(err) return err;                 
                      req.flash('success', "Password reset successful, now login with new password");                                               
                      res.redirect('/login');   
                });
              }
          });
      }


};
