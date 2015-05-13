define([
    'backbone',
    'models/session',
    'tmpl/chat',
    'views/gauge',
    'views/messages/msgchat',
    'views/messages/msgsystem'
], function(
    Backbone,
    session,
    tmpl,
    gaugeView,
    MessageChatView,
    MessageSysView

){

    var ChatView = Backbone.View.extend({
        events: {
            'click .js-chatsend': 'onSendClick',
            'keyup .js-chatinput': 'onInputKeyup'
        },

        template: tmpl,

        runChat: function() {
        },

        initialize: function () { 
            this.model.off('message');
            this.model.off('status_changed');
            this.model.on('message', _.bind(this.onUserChatMessage, this));   
            this.model.on('status_changed', _.bind(this.onStatusChanged, this));   

            this.render();
            this.chatarea = this.$('.js-chatarea');   
        },

        render: function () {  
            this.$el.html( this.template() );
        },

        hide: function () {
            this.model.off('message');
            this.model.off('status_changed');

            if (session.user.socket) {
                console.log('closing socket');
                session.user.socket.close();                
            }
        },

        onUserChatMessage: function (data) {
            this.showMessage(data.id, data.text);
        },

        onInputKeyup: function (event) {
            if (event.keyCode == 13) {
                this.sendMessage();
            }
        },

        onSendClick: function () {
            this.sendMessage();
        },

        onStatusChanged: function(args) {
            gaugeView.show();
            setTimeout( _.bind(function () {
                gaugeView.hide();
                if (args['role'] == undefined)
                    var message = 'You are spectator. Enjoy the game.'
                else if (args['role'] == 'artist')
                    var message = 'You are the artist. Draw this: ' + args['secret'] + '.';
                else
                    var message = 'You are Cassandra. Guess the word.'
                
                this.chatarea.append(new MessageSysView({ 'text': message }).el );
                var chatarea = this.chatarea[0];
                chatarea.scrollTop = chatarea.scrollHeight;
            }, this), 800);            
        },

        sendMessage: function () {
            var outgoingMessage = $('.js-chatinput').val();
            if (outgoingMessage == '') {
               return;
            }
            this.model.sendChatMessage(outgoingMessage);
            $('.js-chatinput').val('');
            this.showMessage(this.model.get('name'), outgoingMessage);
        },

        showMessage: function (id, text) {
            this.chatarea.append(new MessageChatView({ 'name': id, 'text': text }).el );
            var chatarea = this.chatarea[0];
            chatarea.scrollTop = chatarea.scrollHeight;
        },

        show: function () {
            this.$el.show();
        }

    });

    return ChatView;
});
