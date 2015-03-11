define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({

        events: {
            'submit form.loginform': 'submitLoginForm'
        },

        template: tmpl,
        initialize: function () {        
            this.$el.html( this.template() );
        },
        render: function () {
            
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

    return new View();
});