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
            'submit .login__form': 'submitForm',
            'keyup .login__input': 'saveToStorage'
        },

        template: template,

        initialize: function () {
            this.render();
        },

        getFormJSON: function () {
            var loginForm = $('.login__form').serializeArray();
            var json_data = {};
            $.each(loginForm,
                function(i, v) {
                    json_data[v.name] = v.value;
                });
            return json_data;
        },

        render: function () {
            json_string = localStorage.getItem('loginData');
            json_data = JSON.parse(json_string);
            if (json_data == null) {
                json_data = { name: '', password: '' };
            } 
            
            this.$el.html( this.template({
                        name: json_data.name, 
                        password: json_data.password 
                    }));

            this.hide();
        },

        saveToStorage: function () {
            json_data = this.getFormJSON();
            localStorage.setItem('loginData', JSON.stringify(json_data));
        },

        show: function () {
            this.trigger("show", this);
            $('.loginbackground').animate({
                height: 325
            }, 450);
            this.$el.show();
        },

        hide: function () {
            $('.login__input').val('');
            $('.login__errormsg').html('');
            localStorage.removeItem('loginData');
            this.$el.hide();
            $('.loginbackground').height(0);
        },

        submitForm: function(event) {
            event.preventDefault();
            json_data = this.getFormJSON();
            session.user.set(json_data);
            session.login({
                error: _.bind(function () {
                    $('.login__errormsg').html('Incorrect email or password');
                }, this) });
            localStorage.removeItem('loginData');
        }

    });

    return new LoginView();
});
