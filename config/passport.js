var LocalStrategy     =   require('passport-local').Strategy;
// load up the user model
var User              =   require('../app/models/user');

module.exports = function(passport) {

    // used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.local.username);
});

    // used to deserialize the user
passport.deserializeUser(function(username, done) {
   done(null, {username : username});
});

passport.use('local-signup', new LocalStrategy({
       usernameField : 'username',
       passwordField : 'password',
       passReqToCallback : true
       // allows us to pass back the entire request to the callback
   },
   function(req, username, password, done) {

      var firstname   = req.body.firstname;
      var lastname    = req.body.lastname;
      var email       = req.body.email;
       // asynchronous
       // User.findOne wont fire unless data is sent back
       process.nextTick(function() {

       // find a user whose email is the same as the forms email
       // we are checking to see if the user trying to login already exists
       User.findOne({ 'local.username' :  username }, function(err, user) {
           // if there are any errors, return the error
           if (err)
               return done(err);

           // check to see if theres already a user with that email
           if (user) {
               return done(null, false,
                 req.flash('error', 'That username is already taken.'));
           } else {

               // if there is no user with that email
               // create the user
               var newUser            = new User();

               // set the user's local credentials
               newUser.local.username     = username;
               newUser.local.password     = newUser.generateHash(password);
               newUser.local.firstname    = firstname;
               newUser.local.lastname     = lastname;
               newUser.local.email        = email;
               // save the user
               newUser.save(function(err) {
                   if (err)
                       throw err;
                   return done(null, newUser);
                   console.log(newUser.local.email);
               });
           }

       });

       });

   }));

passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, username, password, done) { // callback with email and password from our form

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'local.username' :  username }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
            return done(err);

        // if no user is found, return the message
        if (!user)
            return done(null, false, req.flash('error', 'No user with username  "', username, '"  found.')); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validPassword(password))
            return done(null, false, req.flash('error', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, user);
    });

}));


};
