var express          =  require('express');
var app              =  express();
var port             =  process.env.PORT || 5000;
var morgan           =  require('morgan');
var path             =  require('path');
var ejs              =  require('ejs');
var engine           =  require('ejs-mate');
var bodyParser       =  require('body-parser');
var mongoose         =  require('mongoose');
var passport         =  require('passport');
var flash            =  require('connect-flash');
var cookieParser     =  require('cookie-parser');
var session          =  require('express-session');
var cors             =  require('cors');
var mongostore			 =  require('connect-mongo')(session);

app.use(morgan('dev'));
//connect to database
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
//require passport for authentication
require('./config/passport')(passport);

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(session({
	resave				: true,
	saveUninitialized	: true,
	secret				: configDB.secret,
	store				: new mongostore({url: configDB.url, autoReconnect : true})
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
// this middlewarwe makes the 'user' object accessible throught the req/res cycle
//and also enables sending flash messages to templates
app.use(function(req, res, next){
  res.locals.user     =  req.user;
  res.locals.messages =  req.flash();
  next();
});
app.set('view engine', 'html');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next){
	 res.set('X-Powered-By', 'Agrimon');
	 next();
});
var routes    =  require('./config/routes/index');
app.use(routes);

app.listen(port, function(){
	console.log('app listening on port '+ port);
});
