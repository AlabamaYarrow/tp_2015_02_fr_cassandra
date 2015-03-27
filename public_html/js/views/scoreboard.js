define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores',
    'views/score'
], function(
    Backbone,
    template,
    Scores,
    ScoreView
){

    var Scoreboard = Backbone.View.extend({
        template: template,

        initialize: function () {
            this.collection = new Scores();
            this.collection.set([ {name: 'alice'}, {name: 'bob'}, {name: 'carol'}, {name: 'sam'}, {name: 'paul'}, {name: 'davis'}, {name: 'trent'} ]);
            this.collection.models = _.sortBy(this.collection.models, function(item) {
                return -item.get('score');
            })
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            this.scoreboard = this.$('.scoreboard__list');
        },

        show: function () {
            this.trigger("show");
            this.$el.show();
            this.scoreboard.html('');
            var that = this;
            _(this.collection.models).each(function (item) {
                that.scoreboard.append((new ScoreView({model: item})).el);
            });
        },

        hide: function () {            
            this.$el.hide();
        }
    });

    return new Scoreboard();
});
