define([
    'backbone',
    'tmpl/player'
], function(
    Backbone,
    template
){

    var PlayerView = Backbone.View.extend({

        tagName: 'tr',
        
        template: template,
        
        initialize: function (options) {
            this.options = options;
            this.render();
        },
        
        render: function () {
            this.$el.html(this.template( {'name': this.options.name, 'role': this.options.role} ));            
        }
    });

    return PlayerView;
});
