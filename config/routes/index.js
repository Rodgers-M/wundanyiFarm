var express       =  require('express');
var router        =  express.Router();
var homeRoutes    =  require('./home');

router.get('/', homeRoutes.index);

module.exports = router;
