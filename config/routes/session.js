var passport   	=  require('passport');
var Role		= require("../../app/models/roles"); 
module.exports ={
  new : function(req, res){
    res.render('login', {
        message: req.flash('loginMessage'),
        title: "Login Page"
    });
  },
  create : function(req,res, next){
    passport.authenticate('local-login', function(err, user){
      if(err) return next(err);
      if(!user){
       console.log('user not found');
       return res.redirect('/login');
     }
     req.login(user, function(err){
       if(err) return next(err);
       console.log(user);
       console.log(user.local.username);
       roleId = user.local.role;

       Role.findById(roleId, function(err, role){
         if(err) return err;
         if(role !== null){
           if(role.name == 'admin'){
             res.redirect(req.session.returnTo || '/agrimonadmin');
             delete req.session.returnTo;
           }
           else {
             res.redirect(req.session.returnTo || '/viewanimals');
             delete req.session.returnTo;
           }
         }
         else{
             res.redirect('/viewanimals');
         }
       });
     });
    })(req, res, next);
  },
  delete : function(req, res){
    req.logout();
    res.redirect('/');
   req.session.destroy();
  }
};
