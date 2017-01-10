var express        =  require('express');
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
router.post('/session/create', sessionRoutes.create);
router.get('/logout', sessionRoutes.delete);
router.get('/signup', userRoutes.new );
router.post('/user/create', userRoutes.create);

module.exports = router;
