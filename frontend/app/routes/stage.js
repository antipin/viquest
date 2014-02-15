var App          = require('App'),
    ViewStage    = require('views/stage');

module.exports = function() {
    App.setContent(new ViewStage());
};