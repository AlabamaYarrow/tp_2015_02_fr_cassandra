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
                'submit .gameover__form': _.bind(this.submitForm, this),
            }; 
        },  


        template: template,

        initialize: function () {
            this.listenTo(session.user, 'change', this.render);
            this.render();

        },

        render: function () {
            this.$el.html( this.template( session.user.toJSON() ) );
            this.hide();
        },

        show: function () {
            this.trigger("show", this);
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        },

        submitForm: function(event) {
            event.preventDefault();
            $(this.el).off('submit', '.gameover__form');
            gaugeView.show();
            var fields = $('.gameover__form').serializeArray();
            var data = {};
            _.each(fields, function(field) {
                data[field.name] = field.value;
            });
            scores.create({
                user: session.user,
                score: data.score
            },
            {
                success: _.bind(function () {
                    gaugeView.hide();
                    Backbone.history.navigate('#scoreboard', true);
                    $(this.el).on('submit', '.gameover__form', this.submitForm);
                }, this),
                error: _.bind(function () {
                    gaugeView.hide();
                    alert('Failed to save.');
                    $(this.el).on('submit', '.gameover__form', this.submitForm);
                }, this) 
            });
        }

    });

    return new GameOverView();
});
