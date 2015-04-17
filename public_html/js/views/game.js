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

            session.user.socket = new WebSocket("ws://localhost:8100/api/v1/game/");
            var socket = session.user.socket;            

            socket.onerror = function () {
                console.log('err', this, arguments);
            };

            socket.onmessage = function (event) {
                console.log('mes', this, arguments);
                console.log(event.data);
                messageObject = JSON.parse(event.data);
                var messageType = messageObject['type'];
                if (messageType == 'viewer_status')
                    setUsers( messageObject );
                if (messageType == 'user_come')
                    addNewUser( messageObject );    
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

            function showChatMessage(message) {
                $('.js-chatarea').html.append(message);
            }

            function setUsers( messageObject ) {
                $('.js-users').html('');                
                usersArray = messageObject['body']['viewers'];
                usersArray.forEach( function (user)
                {
                    $('.js-users').append(user['name'] + ' ');
                });               
            }

            function addNewUser( messageObject ) {
                user = messageObject['body']['name'];                
                $('.js-users').append(user + ' ');
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
            this.render();
            
        },

        render: function () {
            this.$el.html( this.template( session.user.toJSON() ) );
            this.hide();
        },

        show: function () {
            console.log('game show');
            this.trigger("show", this);
            paintareaView.show();
            this.runChat();
            this.$el.show();
            
        },

        hide: function () {       
            console.log('game hide');
            if (session.user.socket)
                session.user.socket.close();     
            this.$el.hide();
        },

        setWidth: function () {            
            alert("TODO");
        }

    });

    return new View();
});