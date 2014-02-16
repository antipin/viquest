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

    function _preprocessQuest(quest) {
        return quest.map(function(level, idx) {
            return _.extend(level, {
                id: idx,
                keyHash: crypto.createHash('sha256').update(level.key).digest('hex'),  // SHA256 hash of secret key
                isLast: idx === (quest.length - 1)
            });
        });
    }

    /**
     *
     * @param {Number} levelIndex Level number (starts from 0)
     * @param {String} [prevLevelKey] Secret key of previous level
     * @returns {Object}
     */
    Quest.prototype.getLevel = function(levelIndex, prevLevelKey) {

        var targetLevel = null,
            level = this._quest[levelIndex],
            prevLevel = this._quest[levelIndex - 1] || null;

        // If we have no prev level or prev level key is correct
        if (!prevLevel || (prevLevel && prevLevelKey === prevLevel.key)) {

            targetLevel = _.clone(level);

            // Remove secret key from public level object
            targetLevel.key = '';
        }

        return targetLevel;
    }

    return Quest;

})();

module.exports = new Quest(quest);