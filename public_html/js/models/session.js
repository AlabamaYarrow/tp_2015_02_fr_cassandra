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

        /**
         * Accepts `always`, `error` and `success` callback in options hash.
         */
        login: function(options) {
            options = options || {};
            this.user.save(
                {
                    success: _.bind( function() {
                        this.user.set({ loggedIn: true });
                        console.log('login success');
                        Backbone.history.navigate('#', true);
                        options.always && options.always();
                        options.success && options.success();
                    }, this),

                    error: _.bind( function() {
                        console.log('login fail');
                        this.user.clear();
                        options.always && options.always();
                        options.error && options.error();
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

        /**
         * Accepts `always`, `error` and `success` callback in options hash.
         */
        signup: function(options) {
            options = options || {};
            this.user.save(
                {
                    success: _.bind( function() {
                        console.log('signup success');
                        this.login();
                        options.always && options.always();
                        options.success && options.success();
                    }, this),

                    error: _.bind( function() {
                        console.log('signup fail');
                        this.user.clear();
                        options.always && options.always();
                        options.error && options.error();
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
