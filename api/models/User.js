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

    firstName: {
      type: 'string',
      required: true
    },

    lastName: {
      type: 'string',
      required: true
    },

    displayName: {
      type: 'string',
      required: true
    },

    // Also serves as the email
    username: {
      type: 'string',
      required: true
    },

    // Array of ids
    storiesAuthored: {
      type: 'array',
      required: true
    },

    // Array of stacks
    stack: {
      type: 'array',
      required: true
    },

    following: {
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




  }
};