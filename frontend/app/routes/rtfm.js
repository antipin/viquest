module.exports = function() {

    var App          = require('App'),
        ViewRTFM     = require('views/rtfm');

    App.setContent(new ViewRTFM());
};