var express        =  require('express');
var router         =  express.Router();
var homeRoutes     =  require('./home');
var sessionRoutes  = require('./session');

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.session.returnTo = req.path;
  res.redirect('/login');
}

router.get('/', homeRoutes.index);
router.get('/login', sessionRoutes.new);
router.get('/logout', sessionRoutes.delete);


module.exports = router;
