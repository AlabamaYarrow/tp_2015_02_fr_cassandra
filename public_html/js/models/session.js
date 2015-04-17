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
            console.log('binding to events from session.init');
            this.listenTo(this.user, 'change', function() { console.log('this.user change (session init)');});
            

        },

        checkAuth: function() {            
            this.user.fetch(
                {
                    success: _.bind( function() {                        
                        this.user.set({ loggedIn: true });   
                        console.log('checkAuth success, user:');
                        console.log( this.user.toJSON() );   
                        //console.log( this.user.toJSON() );
                        console.log('navigating'); 
                        Backbone.history.navigate('#checkAuth', true);
                        Backbone.history.navigate('#', true);                                                                                        
                    }, this),

                    error: _.bind( function() {
                        console.log('checkAuth fail');
                        this.user = new User();
                        this.user.trigger('change');
                        //this.user.set({ score: (new Date).getTime() });
                        console.log( this.user.toJSON() );
                    }, this)
                },
                'check'
                )
        },

        login: function() {
            console.log('logging in');

            console.log('binding to events from session.login');
            this.listenTo(this.user, 'change', function() { console.log('this.user change (session login)');});
                        
            this.user.save(
                {
                    success: _.bind( function() {
                        this.user.set({ loggedIn: true });
                        console.log('login success, user:');                         
                        console.log( this.user.toJSON() );                                                
                        Backbone.history.navigate('#', true);                                             
                    }, this),

                    error: _.bind( function() {
                        console.log('login fail');
                        this.user = new User();
                        console.log( this.user.toJSON() );
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

                    error: _.bind( function() {
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

                    error: _.bind( function() {
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