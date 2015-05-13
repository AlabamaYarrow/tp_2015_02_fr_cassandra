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
            this.drawOnOtherCanvas( JSON.stringify({clear: true}) );
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
            this.canvas2 = $('.js-canvas2');
            this.canvas2.get(0).width = $('.paintarea').width();
            this.canvas2.get(0).height = $('.paintarea').height();
        },

        hide: function() {
            this.$('.js-cassandra').off('mouseup');
            this.$('.js-cassandra').off('mousemove');
        },

        onMousedown: function (e) {
            if (session.user.get('role') != 'artist')
                 return;
            this.canvas.on('mousemove', _.bind(this.onMousemove, this));  
            this.canvas.on('mouseleave', _.bind(this.onMouseleave, this));    
            $('.js-cassandra').on('mouseup', _.bind(this.onMouseup, this) );
            $('.js-cassandra').on('mouseleave', _.bind(this.onMouseup, this)  );                     
            this.allowDraw = true;        
            this.calculateOffset();              
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;

            this.curve = {};
            this.curve.color = this.context.strokeStyle;
            this.curve.width = this.context.lineWidth;
            this.curve.start = {'x': x, 'y': y};
            this.curve.lines = [];

            this.prevX = x;
            this.prevY = y;

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


            var line = {'x': x, 'y': y};
            this.curve.lines.push(line);
            this.curve.start = {'x': this.prevX, 'y': this.prevY};

            this.prevX = x;
            this.prevY = y;

            data = JSON.stringify(this.curve);
            this.drawOnOtherCanvas(data);
            this.curve.lines = [];

        },

        drawLine: function (x,y) {
            this.context.lineTo(x,y);
            this.context.stroke();          
        }, 

        finish: function() {   
            this.canvas.off('mousemove');
            this.canvas.off('mouseleave');                        
            if (! this.allowDraw ) {
                $('.js-cassandra').off('mouseup');
                $('.js-cassandra').off('mouseleave');
            }
            this.context.closePath();


        },

        drawOnOtherCanvas: function (data) {
            context = this.canvas2.get(0).getContext('2d');

            var canvasRectangle = this.canvas2.get(0).getBoundingClientRect();
            offsetLeft = canvasRectangle.left + window.scrollX;
            offsetTop = canvasRectangle.top + window.scrollY;

            curve = JSON.parse(data);
            //console.log(curve);

            if (curve.clear) {
                context.fillStyle = '#FFFFFF';
                context.fillRect(0, 0, this.canvas2.width(), this.canvas2.height());
                return;
            }

            context.lineJoin = "round";
            context.lineCap = "round";

            context.beginPath();
            context.moveTo(curve.start.x, curve.start.y);
            context.strokeStyle = curve.color;
            context.lineWidth = curve.width;
            curve.lines.forEach(function (line) {
                context.lineTo(line.x, line.y);
                context.stroke();
            });
        }       

    });

    return PaintareaView;
});