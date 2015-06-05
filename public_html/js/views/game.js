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
            this.render();
            this.hide();
        },

        onUserPlayerStatus: function (data) {               
            this.usersList.append( new PlayerView({ 
                    'name': session.user.get('name'), 
                    'role': data.role }).el );         
            
            if (data.role == 'artist') {                
                this.usersList.append( new PlayerView({ 
                    'name': data.cassandra.name, 
                    'role': 'cassandra' }).el );
            } else {
                this.usersList.append( new PlayerView({ 
                    'name': data.artist.name, 
                    'role': 'artist' }).el );
            }
        },

        onUserViewerStatus: function (data) {
            this.usersList.empty();
        },

        onGuessClick: function(event) {
            session.user.sendMessage('round_finished', {});            
        },

        onRoundFinished: function(event) {  
            gameoverView.show();
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
            this.trigger("show", this);
            session.user.startGame();            
            gaugeView.show();            
            setTimeout( _.bind(function() {
                gaugeView.hide();     
                if ( $.cookie('greeted') != 'true' ) {   
                    $.cookie('greeted', 'true');        
                    greetingView.show();
                }
                this.$el.fadeTo(250,1, _.bind(function () {
                    this.paintarea.show();                                        
                }, this)); 
                this.chat.show();
            }, this), 1000);            
        },

        hide: function () {
            session.user.stopGame();
            this.paintarea.hide();            
            this.chat.hide();
            greetingView.hide(); 
            this.$el.hide();
        }

    });

    return new GameView();
});
