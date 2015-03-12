define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    template
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
        },

        show: function () {
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        },

        submitForm: function(event) {
            var url = '/api/v1/auth/signin';
            event.preventDefault();            
            $.ajax({
                type: "POST",
                url: url,
                data: $('.login__form').serialize(),
                success: function(data) {
                    alert(data);
                },
                error: function(data) {
                    alert("So sorry :(");
                }
            });            
        }
    });

    return new LoginView();
});
