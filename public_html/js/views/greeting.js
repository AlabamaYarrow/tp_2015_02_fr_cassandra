define([
    'backbone',
    'tmpl/greeting'
],  function (
    Backbone,
    template
){
    var GreetingView = Backbone.View.extend({
        template: template,

        events: function() {
            return {
                'click .js-greetingbutton': _.bind(this.hide, this)
            }
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(template());
        },

        show: function () {
            this.$el.appendTo('body');            
            this.$el.show();
            this.$('.greeting').animate({
                top: '40%'
            }, 650);
        },

        hide: function () {              
            this.$('.greeting').animate({
                top: '-100%'
            }, 650, function() {                
            });             
        }
    });

    return new GreetingView();
});
