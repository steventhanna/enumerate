/**
 * AuthController
 *
 * @author Steven T Hanna http://steventhanna.github.com/steventhanna
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  createAccount: function(req, res) {
    var post = req.body;

    var accountDetails = {
      username: post.username,
      password: post.password,
      firstName: post.firstName,
      lastName: post.lastName,
      displayName: post.firstName + " " + post.lastName,
      storiesAuthored: [],
      stacks: [],
      following: [],
      history: [],
      profileStyling: ""
    };

    User.create(accountDetails).exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error creating the user account on the database.");
        console.log("Error = " + err);
        console.log("Error Code: 00001");
        res.serverError();
      } else {
        req.logIn(user, function(err) {
          if (err) {
            console.log("There was an error when trying to login the user after the account was just created.");
            console.log("Error = " + err);
            console.log("Error Code: 00002");
            res.serverError();
          } else {
            res.send({
              success: true,
              status: 200
            });
          }
        });
      }
    });
  },

  login: function(req, res) {
    var user = req.body;

    passport.authenticate('local', function(err, user, info) {
      if (err || !user) {
        console.log("user = " + user);
        console.log("err = " + err);
        console.log("info = ");
        console.log(info);
        console.log("Error Code: 00003");
        res.serverError();
        res.send({
          success: false,
          user: undefined,
          error: true,
          errorMessage: "This user does not exist or there was some sort of error.",
          info: info,
          status: 500
        });
      } else if ((!err) && user) {
        req.logIn(user, function(err) {
          if (err) {
            console.log("There was an error logging in the user.");
            console.log("Error = " + err);
            console.log("Error Code 00004");
            console.log(user);
            res.serverError();
          } else {
            res.send({
              users: user,
              success: true,
              status: 200
            });
          }
        });
      } else {
        res.send({
          user: undefined,
          success: false,
        });
        res.serverError();
      }
    })(req, res);
  },

  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  },

};