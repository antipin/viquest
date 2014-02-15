var Backbone = require('Backbone'),

    Router = Backbone.Router.extend({

        initialize: function() {
            Backbone.history.start({
                pushState: true
            });
        },

        routes: {
            "":            "index",
            "auth":        "auth",
            "stage/:id":   "stage"
        },

        index: require('routes/index'),

        auth: require('routes/auth'),

        stage: require('routes/stage')

    });

(function () {

    var instance;

    module.exports = function() {

        if (instance) return instance;

        return (instance = new Router());
    };
}());