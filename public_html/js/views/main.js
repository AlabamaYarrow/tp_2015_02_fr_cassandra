define([
    'backbone',
    'tmpl/main',
    'models/session'
], function(
    Backbone,
    template,
    session
){

    var View = Backbone.View.extend({
        template: template,

        initialize: function () {              
            console.log('main view init');            
            
            this.listenTo(session.user, 'change', function() {console.log('session.user change (main)');});
            this.listenTo(session.user, 'change', this.render);
            

            session.checkAuth();

            //this.render();
        },

        render: function () {                   
            console.log( 'main render, user: ' );
            console.log( session.user.toJSON() );            
            this.$el.html(this.template( session.user.toJSON() ));
            this.hide();
        },

        show: function () {
            //this.render(); 
            console.log( 'main view show ' );
            this.trigger("show", this);
            this.$el.show();
        },

        hide: function () {            
            this.$el.hide();
        }
    });



    return new View();
});
