define([
    'backbone',
    'tmpl/gameover',
    'views/gauge',
    'collections/scores',
    'models/session'
], function(
    Backbone,
    template,
    gaugeView,
    scores,
    session
){

    var GameOverView = Backbone.View.extend({

        events: function () {
            return {                
                'click .js-gameoverbutton': _.bind(this.onGameoverClick, this)
            }; 
        },          

        template: template,

        onGameoverClick: function() {
            if (session.user.get('role') == 'artist') {
                this.submitScore();
            }

        },

        initialize: function (options) {
            this.options = options;
            this.listenTo(session.user, 'round_finished', this.render);            
            this.render();
            this.hide();
        },

        render: function () {
            this.$el.html(this.template({
                'role': session.user.get('role')
            }));
        },

        show: function () {
            this.trigger("show", this);
            this.$el.show();
            var animateHeight = this.$('.gameover').height(); 
            this.$el.hide();
            this.$('.gameover').height(0);
            this.$('.gameover').animate({
                height: animateHeight
            }, 450);
            this.$el.show(); 
        },

        hide: function () {
            this.$el.hide();
        },

        submitScore: function() {
            $(this.el).off('click', '.js-gameoverbutton');
            gaugeView.show();
            
            scores.create({
                user: session.user,
                score: 1
            },
            {
                success: _.bind(function () {
                    gaugeView.hide();
                    Backbone.history.navigate('#scoreboard', true);
                    $(this.el).on('click', '.js-gameoverbutton', this.submitScore);
                }, this),
                error: _.bind(function () {
                    gaugeView.hide();
                    alert('Failed to save score.');
                    $(this.el).on('click', '.js-gameoverbutton', this.submitScore);
                }, this) 
            });
        }

    });

    return new GameOverView;
});
