module.exports = function(level) {

    var App               = require('App'),
        ViewLevel         = require('views/level');

    if (isNaN(level)) {
        throw new Error('Invalid level index');
    }

    var levelNumber = parseInt(level, 10) + 1;

    var levelModel = App.getQuestCollection().add({
        id: level,
        title: 'Level ' + levelNumber
    });

    App.setContent(new ViewLevel({
        model: levelModel
    }));

    levelModel.fetch();
};
