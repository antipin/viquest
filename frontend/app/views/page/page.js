/**
 * Main view, container for everything else
 * @type {exports}
 */
var Backbone = require('Backbone'),
    BaseView = require('views/base-view');

module.exports = BaseView.extend({

    name: 'container',

    el: 'body'

});