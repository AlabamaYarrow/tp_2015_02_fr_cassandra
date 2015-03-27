define([
    'backbone'
], function(
    Backbone
){

    var previousView;

    var View = Backbone.View.extend({
        addView: function (view) {                
            view.on('show', this.hideView(view) );
        },
        hideView: function(view) {
            if (previousView)
                previousView.hide();
            previousView = view;
        }
    });

    return new View();
});