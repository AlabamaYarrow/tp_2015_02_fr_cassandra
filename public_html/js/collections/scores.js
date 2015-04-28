define([
    'backbone',
    'models/score'
], function (
    Backbone,
    Score
) {
    var Scores = Backbone.Collection.extend({
        model: Score,

        url: '/api/v1/scores/',

        create: function (attributes) {
          attributes.user_id = attributes.user.id;
          delete attributes.user;
          attributes.score = Number(attributes.score);
          return Scores.__super__.create.call(this, attributes,
          {
            success: function () {
              Backbone.history.navigate('#scoreboard', true);
            },
            error: function () {
              alert('Failed to save.');
            } 
          });

        },

        parse: function (response) {
          return response.body.objects;
        }
    });

    return new Scores();
});
