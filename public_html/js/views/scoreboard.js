define([
    'backbone',
    'tmpl/scoreboard'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({

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
        }

    });

    return new View();
});