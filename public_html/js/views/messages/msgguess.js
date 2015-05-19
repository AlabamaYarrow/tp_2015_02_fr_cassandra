define([
    'backbone',
    'tmpl/msgguess'
], function(
    Backbone,
    template
){

    var ChatMessageView = Backbone.View.extend({

        template: template,
        
        initialize: function (options) {
            this.options = options;
            this.render();
        },
        
        render: function () {
            this.$el.html(this.template( {'name': this.options.name, 'text': this.options.text} ));            
        }
    });

    return ChatMessageView;
});
