define([
    'backbone',
    'tmpl/signup'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({

        events: {
            'submit form.signupform': 'submitSignupForm',
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
        submitSignupForm: function(event) {
            var url = '/api/v1/auth/signup';
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
        },

    });

    return new View();
});