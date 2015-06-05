define([
    'backbone',
    'api/sync'
], function(
    Backbone,
    sync
){

    var Score = Backbone.Model.extend({

        sync: sync,
    
        initialize: function () {
        },

        parse: function (response) {
          response = response.body || response;
          _.extend(response, response.user);
          delete response.user;
          return response;
        }
    });

    return Score;
});
