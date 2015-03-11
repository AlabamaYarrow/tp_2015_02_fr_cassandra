define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    template
){

    var LoginView = Backbone.View.extend({

        events: {
            'submit form.loginform': 'submitLoginForm'
        },

        template: template,

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html( this.template() );
        },

        show: function () {
            $(this.el).show();
        },

        hide: function () {
            $(this.el).hide();
        },

        submitLoginForm: function(event) {
            var url = '/api/v1/auth/login';
            event.preventDefault();            
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function(data) {
                    postDispatcher(data);
                },
                error: function(data) {
                    alert("So sorry :(");
                }
            });            
        }
    });

    return new LoginView();
});
