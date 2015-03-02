define([
    'backbone',
    'models/score'
], function(
    Backbone,
    score
){
	var ScoresCollection = Backbone.Collection.extend({
    	model: score
    });

    return ScoresCollection;
});