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
        },

        login: function() {
            console.log('logging in');
            this.user.save(
                {
                    success: _.bind( function() {
                        console.log('login success'); 
                        this.user.set({ loggedIn: true });
                        console.log( this.user.toJSON() );
                        Backbone.history.navigate('#', true);                                             
                    }, this),

                    fail: _.bind( function() {
                        console.log('login fail');
                        this.user = new User();
                    }, this)
                },
                'signin'
            );
        },

        signout: function() {
            console.log('logging out');
            this.user.save(
                {
                    success: _.bind( function() {
                        console.log('logout success');    
                        console.log( this.user.toJSON() );  
                        console.log('user before navigating');    
                        console.log( this.user.toJSON() );                           
                        console.log('navigating');   
                        Backbone.history.navigate('#', true);                       
                    }, this),

                    fail: _.bind( function() {
                        console.log('logout fail');
                    }, this)
                },
                'signout'
            );

            this.user = new User(); 
 
                                                        
        },

        signup: function() {  
            console.log('signing up');          
            this.user.save(
                {
                    success: _.bind( function() {
                        console.log('signup success');                        
                        this.login();                                                
                    }, this),

                    fail: _.bind( function() {
                        console.log('signup fail');
                        this.user = new User();
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