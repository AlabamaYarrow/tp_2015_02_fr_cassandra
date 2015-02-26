define([
    'backbone',
    'tmpl/main'
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

    //global = new View({el: "#page"});
    //return global;
    return new View();
});