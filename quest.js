var quest   = require('./quest.json'),
    crypto  = require('crypto'),
    _       = require('lodash');

var Quest = (function() {

    /**
     * @param {Array} quest
     * @constructor
     */
    function Quest(quest) {
        this._quest = _preprocessQuest(quest);
    }

    /**
     * Extends all levels with correspondent following fields: id, key, keyHash, isLast
     * @param {Array} quest
     * @returns {Array}
     * @private
     */
    function _preprocessQuest(quest) {

        var keyChain = '';

        return quest.map(function(level, idx) {

            keyChain += level.key;

            return _.extend(level, {
                id: idx,
                total: quest.length,
                key: keyChain,
                keyHash: crypto.createHash('sha256').update(keyChain).digest('hex'),  // SHA256 hash of key chain
                isLast: idx === (quest.length - 1)
            });
        });
    }

    /**
     *
     * @param {Number} levelIndex Level number (starts from 0)
     * @param {String} [keyChain] Concatenated secret keys of all previous levels
     * @returns {Object}
     */
    Quest.prototype.getLevel = function(levelIndex, keyChain) {

        var targetLevel = null,
            level = this._quest[levelIndex],
            prevLevel = this._quest[levelIndex - 1] || null;

        // If we have no prev level or prev level key is correct
        if (!prevLevel || (prevLevel && keyChain === prevLevel.key)) {

            targetLevel = _.clone(level);

            // Remove secret key from public level object
            targetLevel.key = '';
            targetLevel.description = '';
        }

        return targetLevel;
    }

    return Quest;

})();

module.exports = new Quest(quest);