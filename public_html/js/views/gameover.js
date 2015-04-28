define([
    'backbone',
    'tmpl/gameover',
    'collections/scores',
    'models/session'
], function(
    Backbone,
    template,
    scores,
    session
){

    var GameOverView = Backbone.View.extend({

        events: {
            'submit .gameover__form': 'submitForm'
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
            var fields = $('.gameover__form').serializeArray();
            var data = {};
            _.each(fields, function(field) {
                data[field.name] = field.value;
            });
            scores.create({
                user: session.user,
                score: data.score
            });
            this.hide();
            Backbone.history.navigate('#scoreboard', true);

        }

    });

    return new GameOverView();
});
