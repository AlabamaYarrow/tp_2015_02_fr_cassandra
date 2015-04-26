define([
    'backbone',
    'views/gauge',
    'models/session',
    'models/user'
], function(
    Backbone,
    gauge,
    session,
    User
){

    var LogoutView = Backbone.View.extend({

        initialize: function () {
        },

        render: function () {
        },

        show: function () {
            this.trigger("show", this);
            this.$el.show();
            gauge.show();
            session.signout();
        },

        hide: function () {
            gauge.hide();
            this.$el.hide();
        }
    });

    return new LogoutView();
});
