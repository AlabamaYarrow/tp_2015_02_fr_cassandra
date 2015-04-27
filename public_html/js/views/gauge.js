define([
    'backbone',
    'tmpl/gauge'
],  function (
    Backbone,
    template
){
    var GaugeView = Backbone.View.extend({
        template: template,

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el
                .html(template())
                .addClass('gauge_hidden')
                .appendTo('body')
            ;
        },

        show: function () {
            this.$el.removeClass('gauge_hidden');
        },

        hide: function () {
            this.$el.addClass('gauge_hidden');
        }
    });

    return new GaugeView();
});
