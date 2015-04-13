define([
    'backbone',
    'tmpl/score'
], function(
    Backbone,
    template
){

    var ScoreView = Backbone.View.extend({

        tagName: 'tr',
        
        template: template,
        
        initialize: function () {
            this.render();
        },
        
        render: function () {
            this.$el.html(this.template( this.model.toJSON()));
        }
    });

    return ScoreView;
});
