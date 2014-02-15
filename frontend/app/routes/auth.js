module.exports = function() {

    var App          = require('App'),
        ViewIntro    = require('views/auth');

    App.setContent(new ViewIntro());
};