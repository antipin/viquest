var Backbone = require('Backbone'),

    Router = Backbone.Router.extend({

        initialize: function() {
            Backbone.history.start({
                pushState: true
            });
        },

        routes: {
            '':            'intro',
            'intro/:id':   'intro',
            'level/:id':   'level',
            'success':     'success'
        },

        intro:     require('routes/intro'),

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