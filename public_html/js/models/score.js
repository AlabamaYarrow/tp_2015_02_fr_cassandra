define([
    'backbone'
], function(
    Backbone
){

    var Score = Backbone.Model.extend({
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
