define([
    'backbone',
    'tmpl/gameover',
    'models/session'
], function(
    Backbone,
    template,
    session
){

    var GameOverView = Backbone.View.extend({

        events: {
            'submit .gameover__form': 'submitForm'
        },

        template: template,

        initialize: function () {
        	this.listenTo(session.user, 'change', this.render);
            this.render();
        },

        render: function () {
            this.$el.html( this.template( session.user.toJSON() ) );

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
            /*
            var signupForm = $('.login__form').serializeArray();
            var json_data = {};
            $.each(signupForm,
                function(i, v) {
                    json_data[v.name] = v.value;
                });
            session.user.set(json_data);          
            session.login();                  
            */
        }     

    });

    return new GameOverView();
});
