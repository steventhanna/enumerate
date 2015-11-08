/**
 * Tag.js
 *
 * @author Steven T Hanna http://steventhanna.github.com/steventhanna
 * @description :: The model for the tag.  Lookup by name, not ID
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    connections: {
      type: 'array',
      required: true
    },

    name: {
      type: 'string',
      required: true,
      unique: true
    },

    color: {
      type: 'string',
    },

  }
};