define([
    'backbone',
    'views/main',
    'views/game',
    'views/login',
    'views/signup',
    'views/scoreboard'
], function(
    Backbone,
    mainView,
    gameView,
    loginView,
    signupView,
    scoreboardView
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
        setCurrentView: function (view) {
            this.currentView && this.currentView.hide();
            this.currentView = view;
            $('#page').append(view.el);
            view.show();
        },
        signupAction: function () {
            this.setCurrentView(signupView);
        }
    });

    return new Router();
});
