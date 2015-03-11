define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    template
){

    var View = Backbone.View.extend({
        template: template,

        initialize: function () {
            this.render()
        },

        render: function () {
            this.$el.html(this.template());
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
