module.exports = function() {

    var App          = require('App'),
        ViewIntro    = require('views/success');

    App.setContent(new ViewIntro());
};