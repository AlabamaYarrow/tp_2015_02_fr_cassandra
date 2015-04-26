define([
    'backbone',
    'models/session'
], function(
    Backbone,
    session
){

    var ChatView = Backbone.View.extend({
        events: {
            'click .js-chatsend': 'onSendClick',
            'keyup .js-chatinput': 'onInputKeyup'
        },

        runChat: function() {
        },

        initialize: function () {
            this.listenTo(this.model, 'chat_message', this.onUserChatMessage);
            this.chatarea = this.$('.js-chatarea');
        },

        hide: function () {
            console.log('game hide');
            if (session.user.socket) {
                console.log('closing socket');
                session.user.socket.close();
            }
            this.$el.hide();
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
            $('.js-chatarea').append('<p class="chat__message">'
                    + id + ': '
                    + text + '</p>');
            var chatarea = this.chatarea[0];
            chatarea.scrollTop = chatarea.scrollHeight;
        }

    });

    return ChatView;
});
