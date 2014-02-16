var App = require('App'),
    BaseView = require('views/base-view');

module.exports = BaseView.extend({

    name: 'level',

    tpl: require('tpl/level'),

    initialize: function() {

        this.listenTo(this.model, "request sync error", this.render);
        this.listenTo(this.model, "change:isUnlocked", this.unlock);

        return this.constructor.__super__.initialize.apply(this, arguments);
    },

    unlock: function(model, isUnlocked) {
        var method = isUnlocked ? 'show' : 'hide';
        this.$elem('next-button')[method]();
    },

    events: function() {
        var events = {};
        events["input " + this.elemSelector('key-input')] = 'onKeyInput';
        events["click " + this.elemSelector('next-button')] = 'onNextClick';
        return events;
    },

    onKeyInput: function(evt) {
        var value = $(evt.target).val().trim();
        this.model.set('key', value);
    },

    onNextClick: function() {

        var next = this.model.getNextId(),
            path = (next === false) ? 'success' : 'level/' + next;

        App.go(path);
    }

});