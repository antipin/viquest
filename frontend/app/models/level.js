var $ = require('jQuery'),
    Backbone = require('Backbone'),
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
        this.on('change:key', $.debounce(this._checkLock, 250, this), this);
    },

    fetch: function() {

        return this.constructor.__super__.fetch.call(this, {
            url: this.url(),
            data: {
                key: this.getKeyChain()
            }
        });
    },

    getNextId: function() {
        return this.get('isLast') ? false : this.get('id') + 1;
    },

    getKeyChain: function() {

        var App = require('App');

        var keyChain = App.getQuestCollection().reduce(function(memo, level) {
            return memo + level.get('key');
        }, '');

        return keyChain;
    },

    _checkLock: function() {
        
        var keyChain = this.getKeyChain(),
            keyChainSHA256Digest = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(keyChain));

        this.set('isUnlocked', this.get('keyHash') === keyChainSHA256Digest);
    }
});