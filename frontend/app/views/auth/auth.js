var App = require('App'),
    BaseView = require('views/base-view');

module.exports = BaseView.extend({

    name: 'auth',

    tpl: require('tpl/auth'),

    events: {
        "click button" : "onButtonCLick"
    },

    onButtonCLick: function() {
        App.go('level/0');
    }

});