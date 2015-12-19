/**
 * StoryController
 *
 * @description :: Server-side logic for managing stories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  new: function(req, res) {
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
        var storyData = {
          title: post.title,
          contents: post.contents,
          tags: post.tags,
          author: post.author,
          comments: [],
          sid: Math.floor(Math.random() * 1000000000000000000000)
        };
        Story.create(storyData).exec(function(err, newStory) {
          if (err) {
            console.log("There was an error creating the story.");
            console.log("Error = " + err);
            console.log("Error Code: 00007");
            res.serverError();
          } else {
            // Add the story ID to the user
            user.storiesAuthored.push(storyData.sid);
            User.save(function(err) {
              if (err) {
                console.log("There was an error saving the user after adding the new story.");
                console.log("Error = " + err);
                console.log("Error Code: 00008");
                res.serverError();
              } else {
                res.send({
                  success: true,
                  error: false
                });
              }
            });
          }
        });
      }
    });
  },

  edit: function(req, res) {
    var post = req.body;
    Story.findOne({
      sid: post.sid
    }).exec(function(err, storyName) {
      if (err || storyName == undefined) {
        console.log("There was an error looking up the story.");
        console.log("Error = " + err);
        console.log("Error Code: 00009");
        res.serverError();
      } else {
        var changes = false;
        if (post.title != undefined) {
          storyName.title = post.title;
          changes = true;
        }
        if (post.contents != undefined) {
          storyName.contents = post.contents;
          changes = true;
        }
        if (post.tags != undefined) {
          storyName.tags = post.tags;
          changes = true;
        }

        if (changes == true) {
          storyName.save(function(err) {
            if (err) {
              console.log("There was an error saving the story after edits.");
              console.log("Error = " + err);
              console.log("Error Code: 00010");
              res.serverError();
            } else {
              res.send({
                success: true,
                error: false
              });
            }
          });
        } else {
          // No edits sent
          console.log("No data sent from the page.");
        }
      }
    });
  },

  delete: function(req, res) {
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
        // Delete the story
        Story.destroy({
          sid: post.sid
        }).exec(function(err) {
          if (err) {
            console.log("There was an error deleting the story.");
            console.log("Error = " + err);
            console.log("Error Code: 00011");
            res.serverError();
          } else {
            // Story successfully deleted.  Remove from all of the stacks
            // and the User and the story list
            Enumerate.findOne({
              name: "enumerate"
            }).exec(function(err, num) {
              if (err || num == undefined) {
                console.log("There was an error finding enumerate.");
                console.log("Error = " + err);
                console.log("Error Code: 00012");
                res.serverError();
              } else {
                // Get index of story list
                var storyListIndex = num.storyList.indexOf(post.sid);
                if (index > -1) {
                  num.storyList.splice(storyListIndex, 1);
                }
                // Save the enumerate
                num.save(function(err) {
                  if (err) {
                    console.log("There was an error saving enumerate after updating the story list.");
                    console.log("Error = " + err);
                    console.log("Error Code: 00013");
                    res.serverError();
                  } else {
                    var userListIndex = user.storiesAuthored.indexOf(post.sid);
                    if (userListIndex > -1) {
                      user.storiesAuthored.splice(userListIndex, 1);
                    }
                    // Save the user
                    user.save(function(err) {
                      if (err) {
                        console.log("There was an error saving the user after updating the stories authored list.");
                        console.log("Error = " + err);
                        console.log("Error Code: 00014");
                        res.serverError();
                      } else {
                        // Success for now... Going to have to delete it from all of the stacks somehow... urgh
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
      }
    });
  },
};