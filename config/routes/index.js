var express           =  require('express');
var passport          =  require('passport');
var router            =  express.Router();
var homeRoutes        =  require('./home');
var sessionRoutes     = require('./session');
var userRoutes        = require('./user');
var animalRoutes      = require('./animal');
var farminputRoutes   = require('./farminput');
var errorhandler      = require('./errorhandlers');
//check if the user is loggedin or not
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.session.returnTo = req.path;
  req.flash('info', 'you must login to acces this page');
  res.redirect('/login');
}
// user routes
router.get('/', homeRoutes.index);
router.get('/login', sessionRoutes.new);
router.post('/session/create',sessionRoutes.create);
router.get('/logout', sessionRoutes.delete);
router.get('/signup', userRoutes.new );
router.post('/user/create', userRoutes.create);

//animal routes
router.get('/records',isLoggedIn, animalRoutes.records);
router.post('/animalnew',isLoggedIn, animalRoutes.create);
router.get('/viewanimals',isLoggedIn, animalRoutes.index);
router.post('/healthcreate',isLoggedIn, animalRoutes.healthcreate);
router.get('/animalhealth',isLoggedIn,  animalRoutes.viewhealth);
router.get('/editanimal/:tagnum',isLoggedIn, animalRoutes.edit);
router.post('/animals/update', isLoggedIn, animalRoutes.update);
router.post('/deleteanimal', isLoggedIn, animalRoutes.delete);

//farm input routes
router.get('/newfarminput', isLoggedIn, farminputRoutes.new);
router.post('/inputcreate', isLoggedIn, farminputRoutes.create);
router.get('/farminput', isLoggedIn, farminputRoutes.index);
router.get('/editinput/:slug', isLoggedIn, farminputRoutes.edit);
router.post('/updateinput', isLoggedIn, farminputRoutes.update);
router.post('/deleteinput', isLoggedIn, farminputRoutes.delete);


//Error handler for any other route apart from the defined routes
router.use(errorhandler.notfound);

//export the router for use by the app
module.exports = router;
