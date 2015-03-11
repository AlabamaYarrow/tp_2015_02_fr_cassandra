define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores',
    'views/score'
], function(
    Backbone,
    tmpl,
    ScoresCollection,
    ScoreView
){

    var View = Backbone.View.extend({
        events: {
            'click button#show': 'showScoreboard',
            'click button#hide': 'hideScoreboard'
        },
        template: tmpl,
        initialize: function () {   
            _.bindAll(this, 'showScoreboard');
            this.collection = new ScoresCollection();
            for (var i = 0; i < 10; i++) {
                this.collection.create();
            }
            this.collection.models = _.sortBy(this.collection.models, function(item) {
                return -item.get('score');
            })
            this.render();
        },
        render: function () {
            this.$el.html(this.template());
        },
        show: function () {
            $(this.el).show();
            $('#scoreboard').html('');
            _(this.collection.models).each(function (item) {
                $('#scoreboard').append((new ScoreView({model: item})).el);
            });
        },
        hide: function () {
            $(this.el).hide();
        },
        showScoreboard: function() {
            $('#scoreboard').show();            
        },
        hideScoreboard: function() {
            $('#scoreboard').hide();
        }
    });

    return new View();
});
