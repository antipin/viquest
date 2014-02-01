(function() {

    var Backbone = require('Backbone'),
        Stage = require('models/stage');

    console.log('App inited');

    var mStage = new Stage({
        title: 'Найи ключ',
        description: 'подсказок не будет, думай сама',
        completed: false
    });

    console.log(mStage);

})();