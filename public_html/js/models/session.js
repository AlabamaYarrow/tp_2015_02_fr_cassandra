define([
    'backbone',
    'models/user'
], function(
    Backbone,
    User
){

    var sessionObject;

    var Session = Backbone.Model.extend({
        
        initialize: function () {
            //_.bindAll(this);
            this.user = new User();            
        },

        defaults: {
            uid: '',
            loggedIN: false            
        },

        checkAuth: function() {
        },

        login: function() {
        },

        signout: function() {
        },

        signup: function() {
        }

    });

    if (!sessionObject) {
        sessionObject = new Session();
    }
    return sessionObject;


});