define([
    'backbone',
    'tmpl/game',
    'views/chat',
    'views/paintarea',
    'views/gameover',
    'models/session'
], function(
    Backbone,
    tmpl,
    ChatView,
    paintareaView,
    gameoverView,
    session
){

    var GameView = Backbone.View.extend({
        events: {
            'click .js-buttonguess': 'onGuessClick'
        },

        template: tmpl,

        initialize: function () {
            this.listenTo(session.user, 'viewer_status', this.onUserViewerStatus);
            this.listenTo(session.user, 'user_come', this.onUserUserCome);
            this.listenTo(session.user, 'user_gone', this.onUserUserGone);            
            this.render();
        },

        addUser: function (data) {
            this.usersList.append('<li class="js-user-' + data.id + '">' + data.name + '</li>');
        },

        onUserUserCome: function (data) {
            this.addUser(data);
        },

        onUserUserGone: function (data) {
            this.removeUser(data);
        },

        onUserViewerStatus: function (data) {
            this.setUsers(data.viewers);
        },

        onGuessClick: function(event) {
            gameoverView.show();
        },

        removeUser: function (data) {
            this.$('.js-user-' + data.id).remove();
        },

        render: function () {
            this.$el.html( this.template( ) );

            this.chat = new ChatView({
                el: this.$('.userschat'),
                model: session.user
            });

            this.usersList = this.$('.js-userslist');

            this.hide();
        },

        setUsers: function (viewers) {
            this.usersList.empty();
            _.each(viewers, _.bind(this.addUser, this));
        },

        show: function () {       
            this.trigger("show", this);            
            
            session.user.startGame();
            this.$el.show();     
            paintareaView.show();
            this.chat.show();
        },

        hide: function () {
            session.user.stopGame();
            paintareaView.hide();
            this.$el.hide();
        }

    });

    return new GameView();
});
