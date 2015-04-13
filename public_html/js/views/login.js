define([
    'backbone',
    'tmpl/login',
    'models/session'
], function(
    Backbone,
    template,
    session
){

    var LoginView = Backbone.View.extend({

        events: {
            'submit .login__form': 'submitForm'
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
            var json_data = { 
                name: $('#nameIdSI').val(), 
                password: $('#passwordIdSI').val()  
            };
            form_data = $('.login__form').serialize();           
            this.model.save( null, form_data,
            {
                emulateJSON: true,                 
                wait: true,                
                success: this.onSubmitSuccess(json_data, this.model),
                error: this.onSubmitFail()
            },
            'signin'
            );                     
        },

        onSubmitSuccess: function(json_data, model) {
            return function(data) {
                console.log('login success'); 
                model.set({name: json_data['name']});      
                console.log(model.get('name'));                                     
                Backbone.history.navigate('#', true);
            }
        },

        onSubmitFail: function() {
            return function(data) {
                console.log('fail');
                alert('Failed to login');
            }
        }

    });

    return new LoginView();
});
