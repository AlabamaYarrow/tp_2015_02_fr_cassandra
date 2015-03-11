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
        events: {
            'click button#show': 'showScoreboard',
            'click button#hide': 'hideScoreboard'
        },

        template: template,

        initialize: function () {
            _.bindAll(this, 'showScoreboard');
            this.collection = new Scores();
            this.collection.set([ {name: 'alice'}, {name: 'bob'}, {name: 'carol'}, {name: 'sam'}, {name: 'paul'}, {name: 'davis'}, {name: 'trent'} ]);
            this.collection.models = _.sortBy(this.collection.models, function(item) {
                return -item.get('score');
            })
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            this.scoreboard = this.$('#scoreboard');
        },

        show: function () {
            this.$el.show();
            this.scoreboard.html('');
            var that = this;
            _(this.collection.models).each(function (item) {
                that.scoreboard.append((new ScoreView({model: item})).el);
            });
        },

        hide: function () {
            this.$el.hide();
        },

        showScoreboard: function() {
            $('#scoreboard').show();            
        },

        hideScoreboard: function() {
            $('#scoreboard').hide();
        }
    });

    return new Scoreboard();
});
