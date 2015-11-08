/**
 * @file: config/application.js
 * @created: November 8, 2015
 * @description: This file handles logins and serial-deserializations
 * @author: Steven Hanna
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

function findByUsername(username, fn) {
  User.findOne({
    username: username
  }).exec(function(err, user) {
    if (err || user == undefined) {
      console.log("There was an error looking up the user with email " + username + ". ");
      console.log("Error = " + err);
      console.log("Error Code 2256");
      return fn("USER NOT FOUND ON DATABASE! ERROR 2256.", null);
    } else {
      return fn(null, user);
    }
  });
}

//Passport session setup.
//To support persistent login session, Passport needs to be able to
//serialize users into and deserialize users out of the session. Typeically,
//this will be as simple as storing the user ID when serializing, and finding
//the user by ID when deserializing
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({
    id: id
  }).exec(function(err, user) {
    if (err || user == undefined) {
      console.log("There was an error looking up the user with the id " + id + ". ");
      console.log("Error = " + err);
      console.log("Error code 1256");
      return done("NOT IN THE USER DATABASE, ERROR 1256", null);
    } else {
      return done(null, user);
    }
  });
});

//User the LocalStrategy within Passport.
//Strategies in passport requrie a verify function, which accept
//credentials (in this case, a username and password), and invoke a callback,
//with a user object
passport.use(new LocalStrategy(

  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function() {
      //Find the user by username. If there is no user with the given username, or the password is not correct, set the user to false to indicate failure and send some sort of flash message or newer equaivalent
      //Otherwise, return an authenticated user.
      findByUsername(username, function(err, user) {
        if (err) {
          return done(err);
        } else if (!user) {
          return done("USER NOT FOUND", null, {
            message: "Unkown user" + username
          });
        } else {
          bcrypt.compare(password, user.password, function(err, res) {
            if (res != true) {
              return done("INVALID PASSWORD", null, {
                message: "Invalid Password"
              });
            } else {
              return done(null, user);
            }
          });
        }
      });
    });
  }
));

module.exports = {
  appName: 'enumerate',

  //Custom express middleware - we use this to register the passwport middlware
  http: {
    customerMiddleWare: function(app) {
      app.use(passport.initialize());
      app.use(passport.session());
      app.use(app.router);
    }
  }
};