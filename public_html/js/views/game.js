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
            'click .js-buttonclear': 'onClear',
            'click .js-buttoncolor': 'setColor',
            'click .js-buttonwidth': 'setWidth'
        },

        template: tmpl,

        onClear: function () {
            paintareaView.clear();
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