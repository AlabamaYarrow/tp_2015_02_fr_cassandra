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

        events: function () {
            return {                              
                'click .js-runjoystick':  _.bind(this.onRunJoystick, this)
            }; 
        },  

        initialize: function () {  
            this.listenTo(session.user, 'change', this.render);
            session.configure();
        },

        render: function () {            
            this.$el.html( this.template( session.user.toJSON() ) );
            this.hide();
            this.trigger('render', this);
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
        },

        hide: function () {            
            this.$el.hide();
        },

        onMessage: function(event) {
            var data = JSON.parse(event.data);
            console.log('mes', data);
            this.header.css({
                color: data.body.color
            });
            this.title.css({
                color: data.body.color
            });
        }, 

        onRunJoystick: function() {
            console.log('connecting from desktop');
            var webSocketOrigin = 'ws://' + document.location.host;
            this.webSocket = new WebSocket(webSocketOrigin + '/api/v1/console/?init=1');
            this.header = this.$('.menu__header');
            this.title = this.$('.menu__title');
            this.webSocket.onmessage = _.bind(this.onMessage, this);
        }
    });

    return new View();
});
