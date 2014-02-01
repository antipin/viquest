var Backbone = require('Backbone');

module.exports = Backbone.Model.extend({

    url: "stage",

    defaults: {
        id: 0,
        title: '',
        description: '',
        completed: false
    }
});