define([
    'backbone'
], function(
    Backbone
){

    
    var ViewManager = Backbone.View.extend({
        addView: function (view) {
            view.on('show', this.onViewShow, this);
            $('#page').append(view.el);
            return this;
        },

        changeView: function(view) {
            if (this.previousView) {
                this.previousView.hide();
            }
            this.previousView = view;
        },

        onViewShow: function (view) {
            this.changeView(view);
        }
    });

    return ViewManager;
});