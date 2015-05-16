define([
    'backbone'
], function(
    Backbone
){

    var Player = Backbone.Model.extend({
          
        defaults: {
          id: 0,
          name: '',
          role: 'viewer'
        },

        initialize: function () {
        },

       
    });

    return Player;
});
