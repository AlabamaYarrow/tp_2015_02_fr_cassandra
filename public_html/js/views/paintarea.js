define([
    'backbone'    
], function(
    Backbone
){

    var View = Backbone.View.extend({

        events: function () {
            return {
                'mousedown .js-canvas': _.bind(this.onMousedown, this),
                'mouseleave .js-canvas': _.bind(this.onMouseleave, this),
                'mouseover .js-canvas': _.bind(this.onMouseover, this),                
                'click .js-buttonclear':  _.bind(this.clear, this),
                'input .js-buttoncolor':  _.bind(this.onChangeColor, this) 
            }; 
        },       
        
        onChangeColor: function() {
            this.context.strokeStyle = $('.js-buttoncolor').val();
        },

        initialize: function () {                                  
            $(window).resize( _.bind(this.calculateOffset, this) );
            this.fileName = 'cassandraCanvas'
            this.allowDraw = false;
            this.goOn = false;
            this.render();
        },

        calculateOffset: function () {         
            var canvasRectangle = this.canvas.get(0).getBoundingClientRect();
            this.offsetLeft = canvasRectangle.left;
            this.offsetTop = canvasRectangle.top;      
        },

        clear: function() {
            this.context.fillStyle = '#FFFFFF';
            this.context.fillRect(0, 0, this.canvas.width(), this.canvas.height());
        },

        show: function () {            
            this.setElement( $('.js-game') );
            $('.js-cassandra').on('mouseup', _.bind(this.onMouseup, this) );

            canvas = $('.js-canvas');
            canvas.get(0).width = $('.paintarea').width();
            canvas.get(0).height = $('.paintarea').height();
            context = canvas.get(0).getContext('2d');

            this.canvas = canvas;
            this.context = context;
            var gameDiv = $('.game').parent();
            gameDiv.removeAttr('style');   
            this.calculateOffset();
        },

        hide: function() {
            $('.js-cassandra').off('mouseup');
        },

        onMousedown: function (e) {
            this.canvas.on('mousemove', _.bind(this.onMousemove, this));            
            this.allowDraw = true;            
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            this.context.moveTo(x, y);
            this.context.beginPath();
        },

        onMouseup: function (e) {
            this.allowDraw = false;
            this.goOn = false;
            this.finish();
            localStorage.setItem(fileName, this.canvas.toDataURL());
        },

        onMouseleave: function (e) {  
            if(this.allowDraw) {
                this.goOn = true;          
            }
            this.finish();
        },

        onMouseover: function (e) {             
            if (this.allowDraw) {        
                var x = e.pageX - this.offsetLeft;
                var y = e.pageY - this.offsetTop;
                this.context.moveTo(x, y);
                this.context.beginPath();      
                this.canvas.on('mousemove', _.bind(this.onMousemove, this));
                this.goOn = false;
            }
        },

        onMousemove: function(e) {
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            this.drawLine(x,y);            
        },

        drawLine: function (x,y) {
            this.context.lineTo(x,y);
            this.context.stroke();          
        }, 

        finish: function() {
            this.canvas.off('mousemove');
            this.context.closePath();
        }       

    });

    return new View();
});