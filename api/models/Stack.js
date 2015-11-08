/**
 * Stack.js
 *
 * @author Steven T Hanna http://steventhanna.github.com/steventhanna
 * @description :: The model for the stack, or the news field
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    stories: {
      type: 'array',
      required: true
    }
  }
};