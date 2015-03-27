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
    viewmanager
){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'signup': 'signupAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            this.setCurrentView(mainView);
        },
        gameAction: function () {
            this.setCurrentView(gameView);
        },
        loginAction: function () {
            this.setCurrentView(loginView);
        },
        scoreboardAction: function () {
            this.setCurrentView(scoreboardView);
        },
        signupAction: function () {
            this.setCurrentView(signupView);
        },
        setCurrentView: function (view) {                        
            $('#page').append(view.el);
            viewmanager.addView(view);
            view.show();
        }
    });

    return new Router();
});
