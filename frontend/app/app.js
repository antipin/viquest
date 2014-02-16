var $ = require('$'),
    Router = require('Router'),
    CollectionQuest = require('collections/quest'),
    ViewPage = require('views/page');

module.exports = (function() {

    var _router,
        _rootView,
        _questCollection;

    var _setRootView = function(view) {
        _rootView = view;
        $('body').empty().append(_rootView.render().el);
    };

    var _setRouter = function(router) {
        _router = router;
    };

    return {

        initialize: function() {
            _setRootView(new ViewPage());
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
                trigger: true,
                replace: true
            });
        }
    }
}());