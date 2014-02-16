module.exports = function(stage) {

    var App               = require('App'),
        ViewStage         = require('views/stage');

    if (isNaN(stage)) {
        throw new Error('Invalid stage index');
    }

    var stageNumber = parseInt(stage, 10) + 1;

    var stageModel = App.getQuestCollection().add({
        id: stage,
        title: 'Stage ' + stageNumber
    });

    App.setContent(new ViewStage({
        model: stageModel
    }));

    stageModel.fetch();
};
