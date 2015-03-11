define([
    'backbone',
    'tmpl/signup'
], function(
    Backbone,
    template
){

    var SignupView = Backbone.View.extend({

        events: {
            'submit .signup__form': 'submitForm',
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
        }
    });

    return new SignupView();
});
