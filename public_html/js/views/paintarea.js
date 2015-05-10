define([
    'backbone',
    'models/session'    
], function(
    Backbone,
    session
){

    var PaintareaView = Backbone.View.extend({

        events: function () {
            return {
                'mousedown .js-canvas': _.bind(this.onMousedown, this),
                'mouseleave .js-canvas': _.bind(this.onMouseleave, this),
                'mouseover .js-canvas': _.bind(this.onMouseover, this),                
                'click .js-buttonclear':  _.bind(this.clear, this),
                'input .js-buttoncolor':  _.bind(this.onChangeColor, this),
                'input .js-widthselect':  _.bind(this.onChangeWidth, this),
            }; 
        },       

        onChangeWidth: function() {
            this.context.lineWidth = $('.js-widthselect').val();
        },        

        onChangeColor: function() {
            this.context.strokeStyle = $('.js-buttoncolor').val();
        },

        initialize: function () {                                  
            this.allowDraw = false;
            this.goOn = false;
            this.render();
        },

        calculateOffset: function () {
            var canvasRectangle = this.canvas.get(0).getBoundingClientRect();
            this.offsetLeft = canvasRectangle.left + window.scrollX;
            this.offsetTop = canvasRectangle.top + window.scrollY;
        },

        clear: function() {
            this.context.fillStyle = '#FFFFFF';
            this.context.fillRect(0, 0, this.canvas.width(), this.canvas.height());
        },

        render: function () {
            canvas = this.$('.js-canvas');
            canvas.get(0).width = this.$('.paintarea').width();
            canvas.get(0).height = this.$('.paintarea').height();
            context = canvas.get(0).getContext('2d');

            context.lineWidth = 25;
            this.$('.js-widthselect').val('25');
            this.$('.js-buttoncolor').val('#000000');
            context.lineJoin = "round";
            context.lineCap = "round";


            this.canvas = canvas;
            this.context = context;           
        },

        show: function () {
            var gameDiv = $('.game').parent();
            gameDiv.removeAttr('style');
            this.calculateOffset();
        },

        hide: function() {
            this.$('.js-cassandra').off('mouseup');
        },

        onMousedown: function (e) {
            if (session.user.get('role') != 'artist')
                return;
            this.canvas.on('mousemove', _.bind(this.onMousemove, this));   
            $('.js-cassandra').on('mouseup', _.bind(this.onMouseup, this) );
            $('.js-cassandra').on('mouseleave', _.bind(this.onMouseup, this)  );         
            this.allowDraw = true;        
            this.calculateOffset();  
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            this.context.moveTo(x, y);
            this.context.beginPath();
        },

        onMouseup: function (e) {
            this.allowDraw = false;
            this.goOn = false;
            this.finish();
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

    return PaintareaView;
});