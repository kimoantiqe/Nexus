const JwtStrategy = require("passport-jwt").Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const jwtConfig = require("../configurations/jwt.js");
const fbConfig = require("../configurations/fb.js");
const { to } = require("../services/util");


module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = jwtConfig.encryption;

  passport.use(
    new JwtStrategy(opts, async function(jwtPayload, done) {
      let err, user;
      [err, user] = await to(User.findById(jwtPayload.user_id));
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );

  passport.use(new FacebookTokenStrategy({
      clientID: fbConfig.clientID,
      clientSecret: fbConfig.clientSecret
    }, function(accessToken, refreshToken, profile, done) {
      User.findOne({facebookId: profile.id}, function (error, user) {
        if(error){
          return done(err, false);
        }else if(user){
          return done(null, user);
        }else{
          return done(null, {status:"Unregistered user" , profileId:profile.id});
        }

      });
    }
  ));
};
