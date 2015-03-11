define([
    'backbone'
], function(
    Backbone
){

    var View = Backbone.View.extend({
        tagName: 'li',
        
        initialize: function () {
            this.render();
        },
        
        render: function () {
            this.$el.text(this.model.get('name') + ': ' + this.model.get('score'));
        }
    });

    return View;
});
