define([
    'backbone',
    'views/main',
    'views/game',
    'views/login',
    'views/signup',
    'views/scoreboard',   
    'views/viewmanager'    
], function(
    Backbone,
    mainView,
    gameView,
    loginView,
    signupView,
    scoreboardView,       
    ViewManager
){

    var Router = Backbone.Router.extend({
        routes: {
            'game': 'gameAction',
            'login': 'loginAction',
            'scoreboard': 'scoreboardAction',
            'signup': 'signupAction',
            '*default': 'mainAction'
        },

        initialize: function () {
            this.viewManager = new ViewManager({
                el: $('#page')
            });
            this.viewManager
                .addView(gameView)
                .addView(loginView)
                .addView(mainView)
                .addView(scoreboardView)
                .addView(signupView)
                
            ;
        },

        gameAction: function () {               
            gameView.show();
        },

        loginAction: function () {
            loginView.show();
        },

        mainAction: function () {
            mainView.show();
        },

        scoreboardAction: function () {
            scoreboardView.show();
        },

        signupAction: function () {
            signupView.show();
        }
    });

    return new Router();
});
