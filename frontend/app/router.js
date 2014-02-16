var Backbone = require('Backbone'),

    Router = Backbone.Router.extend({

        initialize: function() {
            Backbone.history.start({
                pushState: true
            });
            
            
            console.log(require('routes/help'));
        },

        routes: {
            '':            'index',
            'rtfm':        'rtfm',
            'help':        'help',
            'auth':        'auth',
            'level/:id':   'level',
            'success':     'success'
        },

        index:     require('routes/index'),

        rtfm:      require('routes/rtfm'),

        help:     require('routes/help'),

        auth:      require('routes/auth'),

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