/**
 * LandingController
 *
 * @description :: Server-side logic for managing landings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  testDash: function(req, res) {
    res.view('dashboard/dash');
  }

};