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
            this.listenTo(session.user, 'change', this.render);
            session.checkAuth();            
        },

        render: function () {            
            this.$el.html( this.template( session.user.toJSON() ) );
            this.hide();
            this.trigger('render', this);
        },

        show: function () {
            this.trigger('show', this);
            this.$el.show();
        },

        hide: function () {            
            this.$el.hide();
        }
    });

    return new View();
});
