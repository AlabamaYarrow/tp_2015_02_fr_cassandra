define([
    'backbone',
    
], function(
    Backbone

){

    var View = Backbone.View.extend({
        
        initialize: function () { 
            
            this.render();
        },
        
        render: function () {


        },
        
        show: function () {
            this.showCanvas();       

        },

        showCanvas: function () {
            canvas = $('.js-canvas')[0];
            canvas.width = $('.paintarea').width();
            canvas.height = $('.paintarea').height();
            context = canvas.getContext('2d');

            this.context = context;
            this.canvas = canvas;

            var gameDiv = $('.game').parent();
            gameDiv.removeAttr('style');            
            var canvasRectangle = canvas.getBoundingClientRect();
            offsetLeft = canvasRectangle.left;
            offsetTop = canvasRectangle.top;          


            canvas.addEventListener('mousedown', onMousedown);

            function onMousedown (e) {   
                canvas.addEventListener('mouseup', onMouseup);
                canvas.addEventListener('mousemove', onMousemove);
                canvas.addEventListener('mouseleave', onMouseleave);

                var x = e.pageX - offsetLeft;
                var y = e.pageY - offsetTop;
                context.moveTo(x, y);
                context.beginPath();
            }

            function onMouseup (e) {
                finish();
            }

            function onMouseleave (e) {
                finish();
            }

            function onMousemove (e) {
                var x = e.pageX - offsetLeft;
                var y = e.pageY - offsetTop;
                drawLine(x,y);
            }

            function drawLine(x,y) {
                context.lineTo(x,y);
                context.stroke();
            }

            function finish() {
                context.closePath();
                canvas.removeEventListener('mouseup', onMouseup);
                canvas.removeEventListener('mousemove', onMousemove);
                canvas.removeEventListener('mouseleave', onMouseleave);
            }

        },

    });

    return new View();
});