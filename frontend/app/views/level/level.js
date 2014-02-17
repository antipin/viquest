var App = require('App'),
    BaseView = require('views/base-view'),

    SHOW_HELP_TIMEOUT = 30000;

module.exports = BaseView.extend({

    name: 'level',

    tpl: require('tpl/level'),

    initialize: function() {

        this.listenTo(this.model, "request sync error", this.render);
        this.listenTo(this.model, "change:isUnlocked", this.unlock);

        setTimeout(this.showHelp.bind(this), SHOW_HELP_TIMEOUT);

        return this.constructor.__super__.initialize.apply(this, arguments);
    },

    showHelp: function() {
        this.$elem('help').fadeIn();
    },

    getTemplateData: function() {
        var data = this.constructor.__super__.getTemplateData.apply(this, arguments);
        data = _.extend(data, {
            _progress: Math.round(data.progress * 100)
        });
        return data;
    },

    unlock: function(model, isUnlocked) {

        var _this = this,
            lockState = isUnlocked ? 'fa-unlock' : 'fa-lock';

        this.$elem('lock').removeClass('fa-lock fa-unlock').addClass(lockState);

        if (isUnlocked) {
            this.$elem('key-input').attr('disabled', true);
        }

        setTimeout(function() {
            _this.goNext();
        }, 1000);
    },

    goNext: function() {

        var next = this.model.getNextId(),
            path = (next === false) ? 'success' : 'level/' + next;

        App.go(path);
    },

    events: function() {
        var events = {};
        events["input " + this.elemSelector('key-input')] = 'onKeyInput';
        return events;
    },

    onKeyInput: function(evt) {
        var value = $(evt.target).val().trim();
        this.model.set('key', value);
    }

});