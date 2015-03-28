define([
    'backbone',
    'tmpl/score'
], function(
    Backbone,
    template
){

    var ScoreView = Backbone.View.extend({
        tagName: 'li',

        template: template,
        
        initialize: function () {
            this.render();
        },
        
        render: function () {
            this.$el.text(this.template(this.model.toJSON()));
        }
    });

    return ScoreView;
});
