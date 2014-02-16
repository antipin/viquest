module.exports = function() {

    var App          = require('App'),
        ViewHELP     = require('views/help');

    App.setContent(new ViewHELP());
};