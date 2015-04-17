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

            socket.onclose = function(event) {
                console.log('socket closed');
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
                if (messageType == 'user_gone') {
                    $('.js-userslist').empty();   
                    //session.user.socket.close();             
                    session.user.socket = new WebSocket("ws://localhost:8100/api/v1/game/");
                    socket = session.user.socket;
                }
                if (messageType == 'chat_message') {
                    showChatMessage(messageObject);
                }
            };


            $('.js-chatbutton').click ( function() { 
                sendMessage();
            });

            $('.js-chatinput').keyup(function (e) {
                if (e.keyCode == 13)         
                    sendMessage();
            });

            function sendMessage(message) {

                var outgoingMessage = $('.js-chatinput').val(); 
                $('.js-chatinput').val('');
                if (outgoingMessage == '') return;
                var messageJSON = { type: 'chat_message', body: { id: session.user.id, text: outgoingMessage }};
                socket.send( JSON.stringify(messageJSON) );
                showChatMessage(messageJSON);
            }

            function showChatMessage(messageObject) {

                var uid = messageObject['body']['id'];
                var messageText = messageObject['body']['text'];

                var message = '<p class="chat__message">' 
                        + uid + ': ' 
                        + messageText + '</p>';
                $('.js-chatarea').append(message);
                var chatarea = $('.js-chatarea')[0];
                chatarea.scrollTop = chatarea.scrollHeight;
            }

            function setUsers( messageObject ) {

                $('.js-userslist').empty();                
                usersArray = messageObject['body']['viewers'];
                usersArray.forEach( function (user)
                {
                    $('.js-userslist').append('<li>' + user['name'] + '</li>');
                });               
            }

            function addNewUser( messageObject ) {
                user = messageObject['body']['name'];                
                $('.js-userslist').append('<li>' + user  + '</li>');
            }
        },

        onClear: function () {
            paintareaView.clear();
        },

        setColor: function () {            
            console.log( 'set color, user=' + session.user.get('name'));
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
            if (session.user.socket) {
                console.log('closing socket');
                session.user.socket.close();     
            }
            this.$el.hide();
        },

        setWidth: function () {            
        }

    });

    return new View();
});