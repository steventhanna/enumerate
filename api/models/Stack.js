/**
 * Stack.js
 *
 * @author Steven T Hanna http://steventhanna.github.com/steventhanna
 * @description :: The model for the stack, or the news field
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    stackId: {
      type: 'string',
      unique: true,
      required: true
    },

    stories: {
      type: 'array',
      required: true
    }
  }
};