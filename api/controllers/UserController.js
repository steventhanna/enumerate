/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // Serve the news feed
  newsFeed: function(req, res) {
    /**
     * Sort an array of objects based on a specified property
     * @param property :: the property to sort the array of objects by
     */
    function dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function(a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
      }
    }

    User.findOne({
      id: req.user.id
    }).exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error finding the user.");
        console.log("Error = " + err);
        console.log("Error Code: 00006");
        res.serverError();
      } else {
        // 1. Get popular stack
        var currentFeed = [];
        Enumerate.findOne({
            name: "enumerate"
          }).exec(function(err, num) {
            if (err || num == undefined) {
              console.log("There was an error finding enumerate.");
              console.log("Error = " + err);
              console.log("Error Code: 00012");
              res.serverError();
            } else {
              currentFeed = num.popularStack;
              // 2. Get recent stories by followers
              var followerList = user.following;
              // This probably is not write.
              User.find((id: followerList)).exec(function findUser(err, found) {
                while (found.length) {
                  currentFeed.push(found.pop());
                }
                // This probably is not right either.
                currentFeed.dynamicSort(dateCreated);
              });

              for (var i = 0; i < followerList; i++) {
                User.findOne({
                  id: followerList[i]
                }).exec(function(err, newUser) {
                  if (err || newUser == undefined) {
                    console.log("There was an error finding the user.");
                    console.log("Error = " + err);
                    console.log("Error Code: 00006");
                    res.serverError();
                  } else {
                    var storiesAuth = newUser.storiesAuthored;

                  }
                })
              }
            }
          })
          // 2. Get following recent stories
          // 3. Sort by time authored


      }
    })

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
        if (post.profileStyling != undefined) {
          user.profileStyling = post.profileStyling;
          user.save(function(err) {
            if (err) {
              console.log("There was an error updating the user profile styling.");
              console.log("Error = " + err);
              console.log("Error Code: 00016");
              res.serverError();
            } else {
              res.send({
                success: true
              });
            }
          });
        }
      }
    });
  },

};