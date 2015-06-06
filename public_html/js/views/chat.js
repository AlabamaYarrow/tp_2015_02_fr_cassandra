define([
    'backbone',
    'models/session',
    'tmpl/chat',
    'views/gauge',
    'views/messages/msgchat',
    'views/messages/msgsystem',
    'views/messages/msgprompt',
    'views/messages/msgguess'
], function(
    Backbone,
    session,
    tmpl,
    gaugeView,
    MessageChatView,
    MessageSysView,
    MessagePromptView,
    MessageGuessView
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

        onUserChatMessage: function (message) {            
            data = message.body;
            type = message.type;
            this.showMessage(type, data.name, data.text);
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
            setTimeout( _.bind(function () {
                var message;
                if (args['role'] == undefined) {
                    message = 'Ожидание второго игрока...'
                } else if (args['role'] == 'artist') {
                    message = 'Вы играете за Художника. Нарисуйте это: ' + args['secret'] + '.';
                } else {
                    message = 'Вы играете за Кассандру. Угадайте, что рисует художник, и напишите.';
                }
                this.chatarea.append(new MessageSysView({ 'text': message }).el );
                var chatarea = this.chatarea[0];
                chatarea.scrollTop = chatarea.scrollHeight;
            }, this), 800);            
        },

        sendMessage: function () {
            var messageText = $('.js-chatinput').val();
            if (messageText == '') {
               return;
            }
            var name = this.model.get('name');
            var messageBody = {'name': name, 'text': messageText};
            var type = this.model.sendChatMessage(messageBody);
            $('.js-chatinput').val('');
            this.showMessage(type, name, messageText);
        },

        showMessage: function (type, name, text) {
            if (type == 'chat_message') {
                this.chatarea.append(new MessageChatView({ 'name': name, 'text': text }).el );
            } else if (type == 'prompt_status') {
                this.chatarea.append(new MessagePromptView({ 'name': name, 'text': text }).el );                
            } else if (type == 'cassandra_decided') {    
                this.chatarea.append(new MessageGuessView({ 'name': name, 'text': text }).el );
            }            
            var chatarea = this.chatarea[0];
            chatarea.scrollTop = chatarea.scrollHeight;
        },

        show: function () {
            this.$el.show();
        }

    });

    return ChatView;
});
