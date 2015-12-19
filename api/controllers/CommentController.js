/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  new: function(req, res) {
    var post = req.body;
    User.findOne({
      id: req.user.ud
    }).exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error finding the user.");
        console.log("Error = " + err);
        console.log("Error Code: 00006");
        res.serverError();
      } else {
        var commentData = {
          contents: post.contents,
          author: user.name,
          commentId: Math.floor(Math.random() * 1000000000000000000000)
        }
        Comment.create(commentData).exec(function(err, newComment) {
          if (err) {
            console.log("There was an error creating the new comment for the story.");
            console.log("Error = " + err);
            console.log("Error Code: 00013");
            res.serverError();
          } else {
            Story.findOne({
              sid: post.sid
            }).exec(function(err, currentStory) {
              if (err || currentStory == undefined) {
                console.log("There was an error finding the story.");
                console.log("Error = " + err);
                console.log("Error Code: 00014");
                res.serverError();
              } else {
                // Update the comment array
                if (currentStory.comments == undefined) {
                  currentStory.comments = [];
                }
                currentStory.comments.push(newComment.commentId);
                currentStory.save(function(err) {
                  if (err) {
                    console.log("There was an error saving the story after adding comments.");
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

  }

};