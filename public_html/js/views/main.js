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
            _.bindAll(this, 'render');
            session.user.bind('change', this.render);        
            this.render();
        },

        render: function () {       
            console.log( 'main render, username: ' + session.user.toJSON()['name'] );
            this.$el.html(this.template( session.user.toJSON() ));
            this.hide();
        },

        show: function () {
            this.render(); //FOR TESTS
            this.trigger("show", this);
            this.$el.show();
        },

        hide: function () {            
            this.$el.hide();
        }
    });



    return new View();
});
