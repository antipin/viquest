var Backbone = require('Backbone'),
    Handlebars = require('Handlebars');

module.exports = Backbone.View.extend({

    initialize: function() {

        var classes = ['view'];

        this._name = this.name ? 'view-' + this.name : '';
        classes.push(this._name);
        this.$el.addClass(classes.join(' '));

        this._childView = null;

        if (this.tpl) {
            this.template = Handlebars.compile(this.tpl);
        }
    },

    render: function() {
        if (this.template) {
            this.$el.html(this.template(this.getTemplateData()));
        }
        return this;
    },

    getTemplateData: function() {
        return this.model && this.model.toJSON() || {};
    },

    elemSelector: function(name) {
        return '.' + this._name + '__' + name;
    },

    $elem: function(name) {
        return this.$(this.elemSelector(name));
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