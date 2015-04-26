define([
    'backbone',
    'views/gauge',
    'tmpl/login',
    'models/session'
], function(
    Backbone,
    gauge,
    template,
    session
){

    var LoginView = Backbone.View.extend({

        events: {
            'submit .login__form': 'submitForm'
        },

        template: template,

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html( this.template() );
            this.hide();
        },

        show: function () {
            this.trigger("show", this);
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        },

        submitForm: function(event) {
            event.preventDefault();
            gauge.show();

            var signupForm = $('.login__form').serializeArray();
            var json_data = {};
            $.each(signupForm,
                function(i, v) {
                    json_data[v.name] = v.value;
                });
            session.user.set(json_data);
            session.login({
                always: function () {
                    gauge.hide();
                }
            });
        }

    });

    return new LoginView();
});
