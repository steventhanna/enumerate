/**
 * Story.js
 *
 * @author Steven T Hanna http://steventhanna.github.com/steventhanna
 * @description :: The model for the story
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    sid: {
      type: 'string',
      unique: true,
      required: true
    },

    title: {
      type: 'string',
      required: true
    },

    contents: {
      type: 'string',
      required: true
    },

    // Include?
    images: {
      type: 'array'
    },

    tags: {
      type: 'array'
    },

    views: {
      type: 'float',
    },

    author: {
      type: 'string',
    },

    comments: {
      type: 'array'
    },

  }
};