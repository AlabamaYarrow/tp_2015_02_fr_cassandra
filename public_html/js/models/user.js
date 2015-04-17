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

        parse: function(resp, options) {
            var parsedResp = {};            
            parsedResp.name = resp['body']['name'];
            parsedResp.email = resp['body']['email'];
            parsedResp.score = resp['body']['score'];

            console.log('parsed response:');
            console.log(parsedResp);
            return parsedResp;
        },
        
        fetch: function (options, url) {
            options = options || {};
            options.url = this.urlMap[url];
            return Backbone.Model.prototype.fetch.call(this, options);
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
