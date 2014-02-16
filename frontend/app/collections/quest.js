var Backbone = require('Backbone'),
    ModelStage   = require('models/stage');

module.exports = Backbone.Collection.extend({

    model: ModelStage,

    comparator: 'id'

});