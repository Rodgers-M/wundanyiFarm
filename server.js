var express          =  require('express');
var morgan           = require('morgan');
var path             =  require('path');
var ejs              =  require('ejs');
var engine           =  require('ejs-mate');
var bodyParser       =  require('body-parser');
var app              =  express();
var port             =  process.env.PORT || 5000;
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
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
