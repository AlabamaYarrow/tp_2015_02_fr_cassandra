define([
    'backbone',
    'models/player'
], function (
    Backbone,
    Player
) {
    var Players = Backbone.Collection.extend({
        model: Score,
        
        create: function (attributes, options) {
        },

        parse: function (response) {
          return response.body.objects;
        }
    });

    return new Players();
});
