/**
 * EnumerateController
 *
 * @description :: Server-side logic for managing enumerates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  new: function(req, res) {

    var data = {
      storyList: [],
      tags: [],
      popularStack: []
    };

    Enumerate.create(data).exec(function(err, enumer) {
      if (err || enumer == undefined) {
        console.log("There was an error creating the enumerate.");
        console.log("Error = " + err);
        console.log("Error Code: 00005");
      } else {
        // Enmerate type created
        res.send({
          success: true,
          status: 200
        });
      }
    });
  },

  update: function(req, res) {
    var post = req.body;
    u
  }
};