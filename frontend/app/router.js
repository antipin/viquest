var Backbone = require('Backbone'),

    Router = Backbone.Router.extend({

        initialize: function() {
            Backbone.history.start({
                pushState: true
            });
        },

        routes: {
            '':            'index',
            'rtfm':        'rtfm',
            'help':        'help',
            'level/:id':   'level',
            'success':     'success'
        },

        index:     require('routes/index'),

        rtfm:      require('routes/rtfm'),

        help:     require('routes/help'),

        level:     require('routes/level'),

        success:   require('routes/success')

    });

(function () {

    var instance;

    module.exports = function() {

        if (instance) return instance;

        return (instance = new Router());
    };
}());