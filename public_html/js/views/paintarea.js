define([
    'backbone'    
], function(
    Backbone
){

    var View = Backbone.View.extend({
        el: '.js-paintarea',

        events: function () {
            return {
                'mousedown .js-canvas': _.bind(this.onMousedown, this),
                'mouseup .js-canvas': _.bind(this.onMouseup, this),
                'mouseleave .js-canvas': _.bind(this.onMouseleave, this)
            }; 
        },
        
        initialize: function () {       
            this.render();
        },
        
        render: function () {            
        },
        
        show: function () {
            this.setElement( $('.js-paintarea') );

            canvas = $('.js-canvas');
            canvas[0].width = $('.paintarea').width();
            canvas[0].height = $('.paintarea').height();
            context = canvas[0].getContext('2d');

            this.context = context;
            this.canvas = canvas;

            var gameDiv = $('.game').parent();
            gameDiv.removeAttr('style');            
            var canvasRectangle = canvas[0].getBoundingClientRect();
            this.offsetLeft = canvasRectangle.left;
            this.offsetTop = canvasRectangle.top;          
        },

        onMousedown: function (e) {
            //console.log('mousedown');            
            canvas.on('mousemove', _.bind(this.onMousemove, this));
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            this.context.moveTo(x, y);
            this.context.beginPath();
        },

        onMouseup: function (e) {
            this.finish();
        },

        onMouseleave: function (e) {
            this.finish();
        },

        onMousemove: function(e) {
            //console.log('mousemove');
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            this.drawLine(x,y);            
        },

        drawLine: function (x,y) {
            this.context.lineTo(x,y);
            this.context.stroke();          
        }, 

        finish: function() {
            //console.log('finish');
            canvas.off('mousemove');
            this.context.closePath();
        },

        clear: function() {
            //console.log('clear');            
            canvas = $('.js-canvas');
            canvas[0].width = $('.paintarea').width();
            canvas[0].height = $('.paintarea').height();
            context = canvas[0].getContext('2d');
            
            context.fillStyle = '#FFFFFF';
            context.fillRect(0, 0, canvas.width, canvas.height);
        }

    });

    return new View();
});