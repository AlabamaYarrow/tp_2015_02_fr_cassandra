define([
    'backbone'
], function(
    Backbone
){

    var User = Backbone.Model.extend({
        initialize: function () {
            
        },

        defaults: {
            loggedIn: false,
            name: '',
            email: '',
            password: '',
            score: 0            
        },

        urlMap: {
            'signin': '/api/v1/auth/signin/',
            'signup': '/api/v1/auth/signup/',
            'signout': '/api/v1/auth/signout/',
            'check': '/api/v1/auth/check/'
        },

        save: function (options, url) {
            attributes = this.attributes;
            options = options || {};
            options.url = this.urlMap[url];
            return Backbone.Model.prototype.save.call(this, attributes, options);
        }
    });

    return User;
});
