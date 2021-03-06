/**
 * User.js
 *
 * @author Steven T Hanna http://steventhanna.github.com/steventhanna
 * @description :: The model that represents the User
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    id: {
      type: 'string',
      required: true,
      unique: true
    },

    name: {
      type: 'string',
      required: true
    },

    // Also serves as the email
    username: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    // Array of ids
    storiesAuthored: {
      type: 'array',
      required: true
    },

    // Array of stacks
    stacks: {
      type: 'array',
      required: true
    },

    following: {
      type: 'array',
      required: true
    },

    followers: {
      type: 'array',
      required: true
    },

    history: {
      type: 'array',
      required: true
    },

    profileStyling: {
      type: 'string',
    },

    comments: {
      type: 'array'
    }




  }
};