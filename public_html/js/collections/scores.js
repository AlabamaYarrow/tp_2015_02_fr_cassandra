define([
    'backbone',
    'models/score'
], function (
    Backbone,
    Score
) {
    var Scores = Backbone.Collection.extend({
        model: Score
    });

    return Scores;
});
