module.exports = function() {
    
    var App          = require('App'),
        ViewIntro    = require('views/intro');

    App.setContent(new ViewIntro());
};