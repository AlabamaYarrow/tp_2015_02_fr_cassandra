define([
    'backbone',
    'views/main',
    'views/game',
    'views/login',
    'views/scoreboard'
], function(
    Backbone,
    mainView,
    gameView,
    loginView,
    scoreboardView
){

    $('#page').append(mainView.el);

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            loginView.hide();
            scoreboardView.hide();
            gameView.hide();
            
            mainView.show();

        },
        scoreboardAction: function () {
            mainView.hide();
            $('#page').append(scoreboardView.el);
            scoreboardView.show();

        },
        gameAction: function () {
            mainView.hide();
            $('#page').append(gameView.el);
            gameView.show();
        },
        loginAction: function () {
            mainView.hide();
            $('#page').append(loginView.el);
            loginView.show();
        }
    });

    return new Router();
});