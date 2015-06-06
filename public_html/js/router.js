define([
    'backbone',
    'views/main',
    'views/game',
    'views/login',
    'views/logout',
    'views/signup',
    'views/scoreboard',
    'views/gameover',
    'views/viewmanager'
], function(
    Backbone,
    mainView,
    gameView,
    loginView,
    logoutView,
    signupView,
    scoreboardView,
    gameoverView,
    ViewManager
){

    var Router = Backbone.Router.extend({
        routes: {
            'game': 'gameAction',
            'login': 'loginAction',
            'logout': 'logoutAction',
            'scoreboard': 'scoreboardAction',
            'signup': 'signupAction',
            '*default': 'mainAction'
        },

        initialize: function () {
            this.viewManager = new ViewManager({
                el: $('#page'),
                router: this
            });
            this.viewManager
                .addView(gameView)
                .addView(loginView)
                .addView(logoutView)
                .addView(mainView)
                .addView(scoreboardView)
                .addView(signupView)
                .addView(gameoverView)
            ;
        },

        gameAction: function () {
            gameView.show();
        },

        loginAction: function () {
            loginView.show();
        },

        logoutAction: function () {
            logoutView.show();
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
