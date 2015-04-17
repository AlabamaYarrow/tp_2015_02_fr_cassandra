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
            //this.model = session.user;
        },

        render: function () {
        },

        show: function () {
            this.trigger("show", this);
            this.$el.show();
            session.signout();
        },

        hide: function () {
            this.$el.hide();
        }
    });

    return new LogoutView();
});
