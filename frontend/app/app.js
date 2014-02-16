var $ = require('$'),
    Router = require('Router'),
    CollectionQuest = require('collections/quest'),
    ViewPage = require('views/page');

module.exports = (function() {

    var _router,
        _rootView,
        _questCollection;

    var _setRootView = function() {
        _rootView = new ViewPage();
    };

    var _setRouter = function(router) {
        _router = router;
    };

    return {

        initialize: function() {
            _setRootView();
            _setRouter(new Router());
        },

        getRouter: function() {
            return _router;
        },

        getQuestCollection: function() {
            if (_questCollection) return _questCollection;
            return (_questCollection = new CollectionQuest());
        },

        setContent: function() {
            _rootView.setContent.apply(_rootView, arguments);
        },

        go: function(path) {
            this.getRouter().navigate(path, {
                trigger: true
            });
        }
    }
}());