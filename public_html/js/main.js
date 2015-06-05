require.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        'jquery.cookie': "lib/jquery.cookie",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        backboneModal: "lib/backboneModal"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'jquery.cookie': {     
            deps: ['jquery']
        }
    }
});

define([
    'backbone',
    'router',
    'jquery.cookie'
], function(
    Backbone,
    router
){
    Backbone.history.start();
});
