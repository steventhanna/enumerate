/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  newsFeed: function(req, res) {

  },

  addFollower: function(req, res) {
    var post = req.body;

    User.findOne({
      id: req.user.id
    }).exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error finding the user.");
        console.log("Error = " + err);
        console.log("Error Code: 00006");
        res.serverError();
      } else {
        user.following.push(post.userID);
        user.save(function(err) {
          if (err) {
            console.log("There was an error updating the user after adding a follower.");
            console.log("Error = " + err);
            console.log("Error Code: 00015");
            res.serverError();
          } else {
            // Add the follower info
            User.findOne({
              id: post.userID
            }).exec(function(err, newUser) {
              if (err || newUser == undefined) {
                console.log("There was an error finding the user.");
                console.log("Error = " + err);
                console.log("Error Code: 00006");
                res.serverError();
              } else {
                newUser.followers.push(req.user.id);
                newUser.save(function(err) {
                  if (err) {
                    console.log("There was an error updating the user after adding a follower.");
                    console.log("Error = " + err);
                    console.log("Error Code: 00015");
                    res.serverError();
                  } else {
                    res.send({
                      success: true
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  },

  updateProfileStyling: function(req, res) {

  }






};