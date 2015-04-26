define([
    'backbone',
    'views/gauge',
    'tmpl/signup',
    'models/session'
], function(
    Backbone,
    gauge,
    template,
    session
){

    var SignupView = Backbone.View.extend({

        events: {
            'submit .signup__form': 'submitForm',
        },

        template: template,

        initialize: function () {
            this.model = session.user;
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

            var signupForm = $('.signup__form').serializeArray();
            var json_data = {};
            $.each(signupForm, function(i, v) {
                json_data[v.name] = v.value;
            });

            console.log(json_data);
            session.user.set(json_data);
            session.signup({
                always: function () {
                    gauge.hide();
                }
            });
        },

    });

    return new SignupView();
});
