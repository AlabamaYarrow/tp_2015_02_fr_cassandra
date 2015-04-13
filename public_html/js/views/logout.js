define([
    'backbone',
    'models/session',
    'models/user'
], function(
    Backbone,
    session,
    User
){

    var LogoutView = Backbone.View.extend({

        initialize: function () {
            this.model = session.user;
        },

        render: function () {
        },

        show: function () {
            this.trigger("show", this);
            this.$el.show();
            
            this.model.save( null, session.user.toJSON(),
            {
                emulateJSON: true,                 
                wait: true,                
                success: function() { console.log('logout success'); },
                error:  function() { console.log('logout fail'); }
            },
            'signout'
            );
            session.user.set({name: ''});
            Backbone.history.navigate('#', true);
        },

        hide: function () {
            this.$el.hide();
        }
    });

    return new LogoutView();
});
