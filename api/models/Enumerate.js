/**
 * Enumerate.js
 *
 * @author Steven T Hanna http://steventhanna.github.com/steventhanna
 * @description :: The overall model for the project, called enumerate
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string'
    },

    storyList: {
      type: 'array',
    },

    tags: {
      type: 'array'
    },

    popularStack: {
      type: 'array'
    }

  }
};