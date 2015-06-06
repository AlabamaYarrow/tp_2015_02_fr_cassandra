define([
    'backbone',
    'tmpl/game',
    'views/chat',
    'views/paintarea',
    'views/gameover',
    'collections/scores',
    'models/session',
    'views/gauge',
    'views/player',
    'views/greeting'
], function(
    Backbone,
    tmpl,
    ChatView,
    PaintareaView,
    gameoverView,
    scores,
    session,
    gaugeView,
    PlayerView,
    greetingView
){

    var GameView = Backbone.View.extend({
        
        events: {
            'click .js-buttonguess': 'onGuessClick'
        },

        template: tmpl,

        initialize: function () {
            this.listenTo(session.user, 'change', this.render);
            this.listenTo(session.user, 'viewer_status', this.onUserViewerStatus);
            this.listenTo(session.user, 'player_status', this.onUserPlayerStatus);
            this.listenTo(session.user, 'round_finished', this.onRoundFinished);
            this.listenTo(session.user, 'socket_closed', this.onSocketClosed);
            this.render();
            this.hide();
        },

        onUserPlayerStatus: function (data) {
            this.$('.js-paintareapreloader').hide();
            if (data.role == 'artist') {
                var role = 'Художник'
            } else {
                var role = 'Кассандра'
            }
            this.usersList.append( new PlayerView({
                'name': session.user.get('name'),
                'role': role
            }).el );
            
            if (data.role == 'artist') {
                this.usersList.append( new PlayerView({ 
                    'name': data.cassandra.name, 
                    'role': 'Кассандра' }).el );
            } else {
                this.usersList.append( new PlayerView({ 
                    'name': data.artist.name, 
                    'role': 'Художник' }).el );
            }
        },

        onUserViewerStatus: function (data) {
            this.$('.js-paintareapreloader').show(); 
            this.writeText();
            this.usersList.empty();
        },

        onGuessClick: function(event) {
            session.user.sendMessage('round_finished', {});
        },

        onRoundFinished: function(event) {
            gameoverView.show();
        },

        onSocketClosed: function(event) {
            if (this.shown) {
                alert('Соединение с сервером было разорвано :( Игра стоит свитч! — попробуйте снова.');
                this.hide();
            }
        },

        render: function () {
            this.$el.html( this.template( session.user.toJSON() ) );
            
            this.paintarea = new PaintareaView({
                el: this.$('.js-game')
            });

            this.chat = new ChatView({
                el: this.$('.userschat'),
                model: session.user
            }); 

            this.usersList = this.$('.js-userslist');
        },

        show: function () {
            this.shown = true;
            this.trigger("show", this);
            session.user.startGame();
            gaugeView.show();
            setTimeout( _.bind(function() {
                gaugeView.hide();
                if (this.shown) { // We need to check if this view was already hidden (during timeout).
                    if (!greetingView.wasShown()) {
                        greetingView.show();
                    }
                    this.$el.fadeTo(250,1, _.bind(function () {
                        this.paintarea.show();
                    }, this)); 
                    this.chat.show();
                }
            }, this), 1000);
        },

        hide: function () {
            this.trigger('hide');
            this.shown = false;
            session.user.stopGame();
            this.paintarea.hide();
            this.chat.hide();
            greetingView.hide(); 
            this.$el.hide();
        },

        writeText: function () {
            canvas = this.$('.js-textcanvas').get(0);
            canvas.width = 550;
            var context = canvas.getContext('2d');
            context.fillStyle = "#585886";
            context.textAlign = 'center';
            context.font = "italic 14pt Palatino Type";
            context.fillText("В ожидании второго игрока", 275, 50);
            context.fillText("можно посмотреть на эти кубики", 275, 75);
        } 

    });

    return new GameView();
});
