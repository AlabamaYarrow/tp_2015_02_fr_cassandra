define([
    'backbone',
    'tmpl/signup',
    'models/session'
], function(
    Backbone,
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
            
            var json_data = {                             
                email: $('#emailIdSP').val(),
                name: $('#nameIdSP').val(), 
                password: $('#passwordIdSP').val()  
            };
            form_data = $('.signup__form').serialize();          
            this.model.save( null, form_data,
            {
                emulateJSON: true,                 
                wait: true,                
                success: this.onSubmitSuccess(json_data, this.model),
                error: this.onSubmitFail()
            },
            'signup'
            );                     
        },

        onSubmitSuccess: function(json_data, model) {
            return function(data) {
                console.log('signup success');
                model.set(json_data);                        
                Backbone.history.navigate('#login', true);
            }
        },

        onSubmitFail: function() {
            return function(data) {
                console.log('signup fail');
                alert('Failed to sign up');
            }
        }
    });

    return new SignupView();
});
