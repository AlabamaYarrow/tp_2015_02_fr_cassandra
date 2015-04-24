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
            this.user = new User();            
        },

        checkAuth: function() {            
            this.user.fetch(
                {
                    success: _.bind( function() {                        
                        this.user.set({ loggedIn: true });   
                        console.log('checkAuth success:');
                    }, this),

                    error: _.bind( function() {
                        console.log('checkAuth fail');
                        this.user.clear();
                        this.user.trigger('change');
                    }, this)
                },
                'check'
                )
        },

        login: function() {
            this.user.save(
                {
                    success: _.bind( function() {
                        this.user.set({ loggedIn: true });
                        console.log('login success');                         
                        Backbone.history.navigate('#', true);                                             
                    }, this),

                    error: _.bind( function() {
                        console.log('login fail');
                        this.user.clear();
                    }, this)
                },
                'signin'
            );            
            
        },

        signout: function() {
            this.user.save(
                {
                    success: _.bind( function() {
                        console.log('logout success');    
                        Backbone.history.navigate('#', true);                       
                    }, this),

                    error: _.bind( function() {
                        console.log('logout fail');
                    }, this)
                },
                'signout'
            );
            this.user.clear();                          
        },

        signup: function() {  
            this.user.save(
                {
                    success: _.bind( function() {
                        console.log('signup success');                        
                        this.login();                                                
                    }, this),

                    error: _.bind( function() {
                        console.log('signup fail');
                        this.user.clear();
                    }, this)
                },
                'signup'
            );
        }

    });

    if (!sessionObject) {
        sessionObject = new Session();
    }
    return sessionObject;

});