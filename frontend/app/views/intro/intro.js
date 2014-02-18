var App = require('App'),
    BaseView = require('views/base-view');

module.exports = BaseView.extend({

    name: 'intro',

    tpl: require('tpl/intro'),

    initialize: function() {
        this.listenTo(this.model, "request sync error", this.render);
        return this.constructor.__super__.initialize.apply(this, arguments);
    },

    events: {
        "click button" : "onButtonCLick"
    },

    onButtonCLick: function() {

        var nextPage;

        if (this.model.get('isLast')) {

            App.go('level/0') ;

        } else {

            nextPage = this.model.get('id') + 1;
            App.go('intro/' + nextPage) ;

        }
    }
});