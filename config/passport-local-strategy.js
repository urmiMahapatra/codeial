const { UserInfo } = require('git');
const passport = require('passport');

const localStrategy  = require ('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport

passport.use(new localStrategy({
    usernameField: 'email'
},
function (email,password,done){
    // find a user and establised the 
    console.log('Urmi Here :' + password);
    User.findOne({email: email}, function (err,user){
        if (err){
            console.log('Error in finding user --> passport');
            return done(err);        
        }

        if(!user || user.password != password){
            if(!user) {
                console.log('Invalid User NULL ');
            }
            console.log('Invalid Username/password');
            return done(null,false);
            
        }
        return done(null,user);
    })
}
))

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});
// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}



module.exports = passport;