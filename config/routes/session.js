var passport   =  require('passport');
module.exports ={
  new : function(req, res){
    res.render('login', {
        message: req.flash('loginMessage'),
        title: "Login Page"
    });
  },
  create : function(req, res, next){
    passport.authenticate('local-login', function(err, user){
      if(err) return next(err);
      if(!user){
        console.log('user not found');
       return res.redirect('/login');
     }
     req.login(user, function(err){
       console.log(user);
       res.redirect(req.session.returnTo || '/viewanimals');
     });
    })(req, res, next);
  },
  delete : function(req, res){
    req.logout();
    res.redirect('/');
   req.session.destroy();
  }
};
