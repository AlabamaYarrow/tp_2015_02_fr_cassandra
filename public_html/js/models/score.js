define([
    'backbone'
], function(
    Backbone
){

    var Score = Backbone.Model.extend({
	    defaults: {
	    	name: '',
	    	score: 0
	    },

	    initialize: function () {
	    	this.set({
	    		name: 'player' + this.cid,
	    		score: Math.floor(Math.random() * (100)+ 1)
	    	});
	    }
    });

    return Score;
});