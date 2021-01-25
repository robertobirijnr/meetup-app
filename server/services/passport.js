const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/users');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


//For session authentication
// passport.serializeUser(function(user, done) {
//   done(null, user.id)
// })

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user)
//   })
// })

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  User.findOne({email}, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false) }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false) }

      return done(null, user)
    })
  })
}))


const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRETE;

// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: config.JWT_SECRET
// }

passport.use(new JwtStrategy(opts,(payload,done)=>{
  User.findById(payload.id,(err,user)=>{
    if(err){
      return done(err,false)
    }

    if(user){
      done(null,user)
    }else{
      done(null,false)
    }
  })
}))