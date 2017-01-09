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

//connect to database
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
//require('./config/passport')(passport);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({ secret: 'youwontgetit' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
app.set('view engine', 'html');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next){
	 res.set('X-Powered-By', 'wundanyiFarm');
	 next();
});
var routes    =  require('./config/routes/index');
app.use( routes);



app.listen(port, function(){
	console.log('app listening on port '+ port);
});
