define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores',
    'models/score'
], function(
    Backbone,
    tmpl,
    ScoresCollection,
    Score
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
                var scoreItem = new Score();
                scoreItem.set({
                    name: 'player' + i.toString(),
                    score: Math.floor(Math.random() * (100)+ 1)
                });
                this.collection.add(scoreItem);                
            }
            this.collection.models = _.sortBy(this.collection.models, function(item) {
                return -item.get('score');
            })
            

            this.$el.html( this.template() );                           
        },

        render: function () {
                  
        },

        show: function () {
            $(this.el).show();
            $('#scoreboard').html('');
            _(this.collection.models).each(function(item) {
                    $('#scoreboard').append(
                    '<li>' +   
                    item.get('name') +
                    ' ' + 
                    item.get('score') + 
                    '</li>');                        
                }
            );
            hideScoreboard();
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