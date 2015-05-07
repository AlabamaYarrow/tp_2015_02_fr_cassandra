define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores',
    'views/score'
], function(
    Backbone,
    template,
    scores,
    ScoreView
){

    var Scoreboard = Backbone.View.extend({
        template: template,

        initialize: function () {
            this.render();
            this.collection = scores;
            this.listenTo(this.collection, 'sync', this.onCollectionSync);
            this.collection.fetch({
              success: _.bind(this.renderCollection, this)
            });

            this.hide();
        },

        onCollectionSync: function () {
            this.renderCollection();
        },

        render: function () {
            this.$el.html(this.template());
            this.scoreboard = this.$('.scoretable__body');
        },

        renderCollection: function () {
            this.scoreboard.html('');
            var that = this;         
            this.collection.models = _.sortBy(this.collection.models, function(item) {
                return -item.get('score');
            })
            this.collection.models = this.collection.first(10);
            this.collection.each(function (model) {
                that.scoreboard.append((new ScoreView({model: model})).el);
            });
        },

        show: function () {
            this.trigger("show", this);
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        }
    });

    return new Scoreboard();
});
