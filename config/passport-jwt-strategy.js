const { models } = require('mongoose');
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');


let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'

}
passport.use(new JWTStrategy(opts, function (jwtPayLoad ,done){


    User.findById(jwtPayLoad._id, function (err, user){
        if (err){
             console.log('Error in finding user from JWt');
            return;}

        if (user){
             return done(null,user);
        }else{
            return done (null, false);
        }
            
        })
}));

models.export = passport
