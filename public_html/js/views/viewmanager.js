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

        onViewRender: function() { 
            this.show(); 
        },

        changeView: function(view) {
            if (this.previousView) {
                this.previousView.off('render');
                this.previousView.hide();
            }
            view.on('render', this.onViewRender);
            this.previousView = view;            
        },

        onViewShow: function (view) {
            this.changeView(view);
        }
    });

    return ViewManager;
});