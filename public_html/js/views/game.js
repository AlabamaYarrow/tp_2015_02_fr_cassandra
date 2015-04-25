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
            'click .js-buttonclear': 'onClearClick',
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

        onClearClick: function () {
            paintareaView.clear();
        },

        onGuessClick: function(event) {
            gameoverView.show();
        },

        removeUser: function (data) {
            this.$('.js-user-' + data.id).remove();
        },

        render: function () {
            this.$el.html( this.template( session.user.toJSON() ) );
            this.usersList = this.$('.js-userslist');
            this.chat = new ChatView({
              el: this.$('.chat'),
              model: session.user
            });
            this.hide();
        },

        setUsers: function (viewers) {
            this.usersList.empty();
            _.each(viewers, _.bind(this.addUser, this));
        },

        show: function () {
            this.trigger("show", this);
            paintareaView.show();
            session.user.startGame();
            this.$el.show();
        },

        hide: function () {
            session.user.stopGame();
            this.$el.hide();
        }

    });

    return new GameView();
});
