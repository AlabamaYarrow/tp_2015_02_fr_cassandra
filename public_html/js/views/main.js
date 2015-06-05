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
            session.configure();
        },

        render: function () {            
            this.$el.html( this.template( session.user.toJSON() ) );
            this.hide();
            this.trigger('render', this);
            this.coloredElements = this.$('.js-menu__header, .js-menu__title');
        },

        show: function () {
            this.trigger('show', this);
            this.$el.show();
            var animateHeight = this.$('.menu').height(); 
            this.$el.hide();
            this.$('.menu').height(0);
            this.$('.menu').animate({
                height: animateHeight
            }, 450);
            this.$el.show();
            if (this.$('.js-desktop-menu').is(':visible')) {
                this.openWebSocket();
            }
        },

        hide: function () {
            this.$el.hide();
            this.closeWebSocket();
        },

        onMessage: function (event) {
            var data = JSON.parse(event.data);
            this.coloredElements.css({
                color: data.body.color
            });
        }, 

        openWebSocket: function () {
            // var webSocketOrigin = 'ws://' + document.location.host;
            // this.webSocket = new WebSocket(webSocketOrigin + '/api/v1/console/?init=1');
            // this.webSocket.onmessage = _.bind(this.onMessage, this);
        }, 

        closeWebSocket: function () {
            if (this.webSocket) {
                this.webSocket.close();
                this.webSocket = undefined;
            }
        }
    });

    return new View();
});
