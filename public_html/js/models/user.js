define([
    'backbone'
], function(
    Backbone
){

    var User = Backbone.Model.extend({

        socket: {},

        initialize: function () {      
            this.socket = 0;
        },

        defaults: {
            id: 0,
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

        clear: function() {
            this.set({
                loggedIn: false, name: '',
                email: '',
                password: '',
                score: 0
            });
        },

        parse: function(resp, options) {
            var parsedResp = {};            
            parsedResp.id = resp['body']['id'];
            parsedResp.name = resp['body']['name'];
            parsedResp.email = resp['body']['email'];
            parsedResp.score = resp['body']['score'];

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
