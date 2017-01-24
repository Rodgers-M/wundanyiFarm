module.exports ={
  new : function(req, res){
    res.render('login', {
        message: req.flash('loginMessage'),
        title: "Login Page"
    });
  },
  delete : function(req, res){
    req.logout();
    res.redirect('/');
   req.session.destroy();
  }
};
