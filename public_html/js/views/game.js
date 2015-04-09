define([
    'backbone',
    'tmpl/game',
    'views/paintarea'
], function(
    Backbone,
    tmpl,
    paintareaView
){

    var View = Backbone.View.extend({
        events: {
            'click .js-buttonclear': 'clear',
            'click .js-buttoncolor': 'color'
        },

        template: tmpl,

        clear: function () {
            canvas = $('.js-canvas')[0];
            canvas.width = $('.paintarea').width();
            canvas.height = $('.paintarea').height();
            context = canvas.getContext('2d');
            context.fillStyle = '#FFFFFF';
            context.fillRect(0, 0, canvas.width, canvas.height);
        },

        color: function () {
            alert("TODO");
        },        

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html( this.template() );
            this.hide();
        },

        show: function () {
            this.trigger("show", this);
            paintareaView.show();
            this.$el.show();
        },

        hide: function () {            
            this.$el.hide();
        }

    });

    return new View();
});