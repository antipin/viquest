var pages   = require('./pages.json'),
    _       = require('lodash');

var Page = (function() {

    /**
     * @param {Array} page
     * @constructor
     */
    function Page(pages) {
        this._pages = _preprocessPage(pages);
    }

    /**
     * Extends all levels with correspondent following fields: id, key, keyHash, isLast
     * @param {Array} page
     * @returns {Array}
     * @private
     */
    function _preprocessPage(pages) {
        return pages.map(function(page, idx) {
            return _.extend(page, {
                id: idx,
                isLast: idx === (pages.length - 1)
            });
        });
    }

    /**
     *
     * @param {Number} pageIndex Level number (starts from 0)
     * @returns {Object}
     */
    Page.prototype.getPage = function(pageIndex) {
        var page = this._pages[pageIndex];
        return page ? _.clone(page) : null;
    }

    return Page;

})();

module.exports = new Page(pages);