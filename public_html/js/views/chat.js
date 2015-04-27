define([
    'backbone',
    'models/session',
    'tmpl/chat'
], function(
    Backbone,
    session,
    tmpl
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
            this.listenTo(this.model, 'chat_message', this.onUserChatMessage);
            this.render();
            this.chatarea = this.$('.js-chatarea');   
        },

        render: function () {  
            this.$el.html( this.template() );
        },

        hide: function () {
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
        },

        show: function () {
            this.$el.show();
        }

    });

    return ChatView;
});
