var User          = require('../../app/models/user');
module.exports ={
  new : function(req, res){
    res.render('signup', {
       message : req.flash('signupMessage'),
      //  title   : "Sign Up"
    });
  },
  create : function(req, res){
    var user           =  User();
       user.local.username       =  req.body.username;
       user.local.firstname      =  req.body.firstname;
       user.local.lastname       =  req.body.lastname;
       user.local.email          =  req.body.email;
       user.local.password       =  req.body.password;

  User.getUserByUsername({'local.username': req.body.username}, function(err, foundUser, done){
       var message = 'That username is already taken';
       if(err) throw err;

       if(foundUser){
        res.render('signup', {
         message: message
         });

       } else {
         console.log('You have no register errors');
         User.createUser(user,function(err, user){
           if (err) throw err;
           res.send('user created');
          /* req.login(user, function(err){
             if (!err){
               console.log(user);
               res.redirect('/');
               //res.send(user);
             } else{
               console.log("there was an error ", err);
             }
           });*/
         });
       }
     });
  }

};
