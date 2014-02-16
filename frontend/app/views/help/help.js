var App = require('App'),
    BaseView = require('views/base-view');

module.exports = BaseView.extend({

    name: 'rtfm',

    tpl: require('tpl/help'),

    events: {
        "click button" : "onButtonCLick"
    },

    onButtonCLick: function() {
        App.go('level/0');
    }
});