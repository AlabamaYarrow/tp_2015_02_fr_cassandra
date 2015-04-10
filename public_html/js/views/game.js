define([
    'backbone',
    'tmpl/game',
    'views/paintarea',
    'views/gameover'
], function(
    Backbone,
    tmpl,
    paintareaView,
    gameoverView
){

    var View = Backbone.View.extend({
        events: {
            'click .js-buttonclear': 'clear',
            'click .js-buttoncolor': 'setColor',
            'click .js-buttonwidth': 'setWidth'
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

        setColor: function () {
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
        },

        setWidth: function () {
            alert("TODO");
        }

    });

    return new View();
});