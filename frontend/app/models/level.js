var Backbone = require('Backbone'),
    sjcl = require('sjcl');

module.exports = Backbone.Model.extend({

    url: function() {
        return "/rest/level/" + this.get('id');
    },

    defaults: {
        id:           '',    // Level id (index)
        title:        '',    // Title
        keyHash:      '',    // SHA256 hash of secret key
        key:          '',    // Secret key. Assumes to be input bu user
        content:      '',    // HTML content of level
        isLast:       '',    // true if level is last one
        isUnlocked:   false  // true if level is unlocked.
    },

    initialize: function() {
        this.on('change:key', this._checkLock, this);
    },

    fetch: function() {

        var App = require('App');

        var prevLevel = App.getQuestCollection().at(this.get('id') - 1);

        return this.constructor.__super__.fetch.call(this, {
            url: this.url(),
            data: {
                key: prevLevel && prevLevel.get('key')
            }
        });
    },

    getNextId: function() {
        return this.get('isLast') ? false : this.get('id') + 1;
    },

    _checkLock: function(model, value) {
        var keySHA256Digest = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(value));
        this.set('isUnlocked', this.get('keyHash') === keySHA256Digest);
    }
});