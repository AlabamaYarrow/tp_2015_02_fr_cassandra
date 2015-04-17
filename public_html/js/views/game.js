define([
    'backbone',
    'tmpl/game',
    'views/paintarea',
    'views/gameover',
    'models/session'
], function(
    Backbone,
    tmpl,
    paintareaView,
    gameoverView,
    session
){

    var View = Backbone.View.extend({
        events: {
            'click .js-buttonclear': 'onClear',
            'click .js-buttoncolor': 'setColor',
            'click .js-buttonwidth': 'setWidth',
            'click .js-chatbutton': 'send'
        },

        template: tmpl,


        runChat: function() {

            var socket = new WebSocket("ws://localhost:8100/api/v1/game/");

            socket.onerror = function () {
                console.log('err', this, arguments);
            };

            socket.onmessage = function () {
                console.log('mes', this, arguments);
            };


            $('.js-chatbutton').click ( function() {                
                var outgoingMessage = $('.js-chatinput').val();

                console.log('sending message:');                
                console.log(outgoingMessage);
                
                var messageJSON = { type: 'chat-message', body: { id: session.user.id, text: outgoingMessage }};
                console.log('JSON formatted message:');      
                console.log( JSON.stringify(messageJSON) ); 
                
                socket.send( JSON.stringify(messageJSON) );
                return false;
            } );

            socket.onclose = function(event) {
                console.log('socket closed');
            };

            // socket.onmessage = function(event) {
            //     console.log('receiving message:');
            //     console.log(event.data);
            //     var incomingMessage = event.data;
            //     showMessage(incomingMessage);
            // };

            function showMessage(message) {
                $('.js-chatarea').html.append(message);
            }


        },

        onClear: function () {
            paintareaView.clear();
        },

        setColor: function () {            
            console.log( 'set color, user=' + session.user.get('name'));
            alert("TODO");
        },        

        initialize: function () {
            _.bindAll(this, 'render');  
            session.user.bind('change', this.render);   //???     
            this.render();
        },

        render: function () {
            this.$el.html( this.template( session.user.toJSON() ) );
            this.hide();
        },

        show: function () {
            this.trigger("show", this);
            paintareaView.show();
            this.$el.show();
            this.runChat();
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