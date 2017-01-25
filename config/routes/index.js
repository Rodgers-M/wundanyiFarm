var express        =  require('express');
var passport       =  require('passport');
var router         =  express.Router();
var homeRoutes     =  require('./home');
var sessionRoutes  = require('./session');
var userRoutes     = require('./user');

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.session.returnTo = req.path;
  res.redirect('/login');
}

router.get('/', homeRoutes.index);
router.get('/login', sessionRoutes.new);
router.post('/session/create',
      passport.authenticate('local-login', {
      successRedirect : '/', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  })
);
router.get('/logout', sessionRoutes.delete);
router.get('/signup', userRoutes.new );
router.post('/user/create',passport.authenticate('local-signup', {
        successRedirect : '/login', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
router.get('/dashboard', function( req, res) {
   res.render('dashboardlayout');
});

module.exports = router;
