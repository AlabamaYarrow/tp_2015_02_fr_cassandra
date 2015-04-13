define([
    'backbone'
], function(
    Backbone
){

    var User = Backbone.Model.extend({
        initialize: function () {
            
        },

        defaults: {
            name: '',
            email: '',
            password: '',
            score: 0            
        },
        /*
        urlMap: {
            'read': '/api/v1/auth/signin/',
            'create': '/api/v1/auth/signup/'
        },
        */
        urlMap: {
            'signin': '/api/v1/auth/signin/',
            'signup': '/api/v1/auth/signup/',
            'signout': '/api/v1/auth/signout/',
            'check': '/api/v1/auth/check/'
        },
        
        
        sync: function(method, model, options) {
            options = options || {};
            //options.url = model.urlMap[method.toLowerCase()];
            return Backbone.sync.apply(this, arguments);
        },
        

        save: function (attributes, data, options, url) {
            options = options || {};
            options.url = this.urlMap[url];
            attributes = attributes || {};
            this.set(attributes);
            options.data = data; 
            return Backbone.Model.prototype.save.call(this, attributes, options);
        }

    });

    return User;
});
