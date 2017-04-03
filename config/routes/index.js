var express           =  require('express');
var passport          =  require('passport');
var router            =  express.Router();
var homeRoutes        =  require('./home');
var sessionRoutes     = require('./session');
var userRoutes        = require('./user');
var animalRoutes      = require('./animal');
var farminputRoutes   = require('./farminput');
//check if the user is loggedin or not
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.session.returnTo = req.path;
  req.flash('info', 'you must login to acces this page');
  res.redirect('/login');
}

router.get('/', homeRoutes.index);
router.get('/login', sessionRoutes.new);
router.post('/session/create',sessionRoutes.create);
router.get('/logout', sessionRoutes.delete);
router.get('/signup', userRoutes.new );
router.post('/user/create', userRoutes.create);
router.get('/records',isLoggedIn, animalRoutes.records);
router.post('/animalnew',isLoggedIn, animalRoutes.create);
router.get('/viewanimals',isLoggedIn, animalRoutes.index);
router.post('/healthcreate',isLoggedIn, animalRoutes.healthcreate);
router.get('/animalhealth',  animalRoutes.viewhealth);
router.get('/farminput', isLoggedIn, farminputRoutes.new);
router.post('/inputcreate', isLoggedIn, farminputRoutes.create);

module.exports = router;
