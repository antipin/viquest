var App = require('App'),
    BaseView = require('views/base-view');

module.exports = BaseView.extend({

    tpl: require('tpl/intro'),

    className: 'intro',

    events: {
        "click button" : "onButtonCLick"
    },

    onButtonCLick: function() {
        App.go('auth');
    }
});