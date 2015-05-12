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
            if (this.model)
                this.$el.html(this.template( this.model.toJSON()));
            else 
                this.$el.html( this.template({name: '', score: '-'}) );
        }
    });

    return ScoreView;
});
