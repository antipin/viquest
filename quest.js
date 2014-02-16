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
        return quest.map(function(stage, idx) {
            return _.extend(stage, {
                id: idx,
                keyHash: crypto.createHash('sha256').update(stage.key).digest('hex'),  // SHA256 hash of secret key
                isLast: idx === (quest.length - 1)
            });
        });
    }

    /**
     *
     * @param {Number} stageIndex Stage number (starts from 0)
     * @param {String} [previousStageKey] Secret key of previous stage
     * @returns {Object}
     */
    Quest.prototype.getStage = function(stageIndex, previousStageKey) {

        var targetStage = null,
            stage = this._quest[stageIndex],
            prevStage = this._quest[stageIndex - 1] || null;

        // If we have no prev stage or prev stage key is correct
        if (!prevStage || (prevStage && previousStageKey === prevStage.key)) {

            targetStage = _.clone(stage);

            // Remove secret key from public stage object
            targetStage.key = '';
        }

        return targetStage;
    }

    return Quest;

})();

module.exports = new Quest(quest);