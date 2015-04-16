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
            
            var signupForm = $('.signup__form').serializeArray();
            var json_data = {};
            $.each(signupForm,
                function(i, v) {
                    json_data[v.name] = v.value;
                });

            console.log(json_data);
            session.user.set(json_data);
            //console.log( session.user.get('name') + ' ' + session.user.get('email'));            
            session.signup();


        },

    });

    return new SignupView();
});
