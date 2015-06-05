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
                'click .js-greeting-button-ok': _.bind(this.onClickButtonOK, this)
            }
        },

        initialize: function () {
            this.render();
        },

        onClickButtonOK: function () {
            this.hide();
            $.cookie('greeted', 'true');
        },

        render: function () {
            this.$el
                .html(this.template())
            ;
            this.windowEl = this.$('.js-greeting-window');
            this.greeting = this.$('.greeting');
        },

        show: function () {
            this.$el
                .appendTo('body')
            //    .show()
            ;
            /*
            //var desiredTop:
            this.$('.greeting')
                //.css({ opacity: 0 })
                .fadeIn(65000)
            ;*/
            this.greeting
                .show()
                .removeClass('greeting_hidden')
            ;
        },

        hide: function () {
            var view = this;
            /*this.$('.greeting')
                .fadeOut(650, function () {
                    view.$el.hide();
                })
            ;*/
            this.greeting.addClass('greeting_hidden');
            setTimeout(function () {
                view.greeting.hide();
            }, 650);
        },

        wasShown: function () {
            return $.cookie('greeted') === 'true';
        }
    });

    return new GreetingView();
});
