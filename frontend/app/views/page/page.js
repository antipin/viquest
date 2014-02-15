/**
 * Main view, container for everything else
 * @type {exports}
 */
var Backbone = require('Backbone'),
    BaseView = require('views/base-view');

module.exports = BaseView.extend({

    tag: 'div',

    initialize: function() {},

    render: function() {

        return this;
    }

});