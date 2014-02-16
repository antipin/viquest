var App = require('App'),
    BaseView = require('views/base-view');

module.exports = BaseView.extend({

    name: 'intro',

    tpl: require('tpl/intro'),

    events: {
        "click button" : "onButtonCLick"
    },

    onButtonCLick: function() {
        App.go('auth');
    }
});