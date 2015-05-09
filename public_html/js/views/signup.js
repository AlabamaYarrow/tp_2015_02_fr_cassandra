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
            'keyup .signup__input': 'saveToStorage'
        },

        template: template,

        initialize: function () {
            this.model = session.user;
            this.render();
        },

        getFormJSON: function () {
            var signupForm = $('.signup__form').serializeArray();
            var json_data = {};
            $.each(signupForm,
                function(i, v) {
                    json_data[v.name] = v.value;
                });
            return json_data;
        },

        render: function () {
            json_string = localStorage.getItem('signupData');
            json_data = JSON.parse(json_string);
            if (json_data == null) {
                json_data = { name: '', email: '', password: '', password_confirmation: '' };
            } 

            this.$el.html( this.template({
                        name: json_data.name, 
                        email: json_data.email,
                        password: json_data.password,
                        password_confirmation: json_data.password_confirmation
                    }));
            
            this.hide();
        },

        saveToStorage: function () {
            json_data = this.getFormJSON();
            localStorage.setItem('signupData', JSON.stringify(json_data));
        },

        show: function () {
            this.trigger("show", this);
            this.$el.show();
        },

        hide: function () {
            $('.signup__input').val('');
            $('.signup__errormsg').html('');
            localStorage.removeItem('signupData');
            this.$el.hide();
        },

        submitForm: function(event) {
            event.preventDefault();

            var signupForm = $('.signup__form').serializeArray();
            var json_data = {};
            $.each(signupForm, function(i, v) {
                json_data[v.name] = v.value;
            });

            if (json_data.password != json_data.password_confirmation) {
                $('.signup__errormsg').html('Passwords dot not match');
                return;
            }


            session.user.set(json_data);
            session.signup({
                error: _.bind(function () {
                    $('.signup__errormsg').html('User already exists');
                }, this) });
            localStorage.removeItem('signupData');
        },

    });

    return new SignupView();
});
