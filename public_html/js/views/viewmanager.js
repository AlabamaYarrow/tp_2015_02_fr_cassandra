define([
    'backbone'
], function(
    Backbone
){

    
    var ViewManager = Backbone.View.extend({
        initialize: function (options) {
            this.router = options.router;
        },

        addView: function (view) {
            view.on('show', this.onViewShow, this);
            this.$el.append(view.el);
            return this;
        },

        onViewHide: function() {
            if (this.previousView) {
                this.undelegateEvents(this.previousView);
                this.previousView = null;
            }
            this.router.navigate('', { trigger: true });
        },

        onViewRender: function() {
            this.show();
        },

        changeView: function(view) {
            if (this.previousView) {
                this.undelegateEvents(this.previousView);
                this.previousView.hide();
                this.previousView = null;
            }
            view.on('render', this.onViewRender, this);
            view.on('hide', this.onViewHide, this);
            this.previousView = view;
        },

        onViewShow: function (view) {
            this.changeView(view);
        },

        undelegateEvents: function (view) {
            view.off('render');
            view.off('hide');
        }
    });

    return ViewManager;
});