var Backbone = require('Backbone'),
    Handlebars = require('Handlebars');

module.exports = Backbone.View.extend({

    initialize: function() {
        this._childView = null;
        this.template = Handlebars.compile(this.tpl);
    },

    render: function() {

        var model = (this.model && this.model.toJSON()) || {};

        if (this.template) {
            this.$el.html(this.template(model));
        }
        return this;
    },

    setContent: function(view) {
        this.removeContent();
        this._childView = view;
        this.$el.html(view.render().el);
        return this;
    },

    removeContent: function() {
        if (this._childView != null) {
            this._childView.remove();
            this._childView = null;
        }
    },

    remove: function() {
        this.removeContent();
        return this.constructor.__super__.initialize.apply(this, arguments);
    }

});