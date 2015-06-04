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
                'mousedown .js-paintarea': _.bind(this.onMousedown, this),
                'mouseover .js-paintarea': _.bind(this.onMouseover, this),
                'mouseleave .js-paintarea': _.bind(this.onCursorLeave, this),                                
                'click .js-buttonclear':  _.bind(this.onClear, this),
                'click .js-eraser':  _.bind(this.onPressEraser, this),                
                'input .js-buttoncolor':  _.bind(this.onChangeColor, this),
                'input .js-widthselect':  _.bind(this.onChangeWidth, this)
            }; 
        },       

        onChangeWidth: function() {
            this.context.lineWidth = $('.js-widthselect').val();
            this.cursorcontext.radius = this.context.lineWidth / 2;
        },        

        onChangeColor: function() {
            this.context.strokeStyle = $('.js-buttoncolor').val();
        },

        onClear: function () {
            this.clear();
            session.user.sendMessage('new_curve',{clear: true});
        },

        onCursorLeave: function () {
            this.cursorcontext.clearRect(0, 0, 
                this.cursorcanvas.width(), this.cursorcanvas.height());
        },

        onMousedown: function (e) {
            if (session.user.get('role') != 'artist')
                 return;
            
            this.paintarea.on('mouseleave', _.bind(this.onMouseleave, this)); 
            this.mousedown = true;   
            this.cassandra.on('mouseup', _.bind(this.onMouseup, this) );
            this.cassandra.on('mouseleave', _.bind(this.onMouseup, this)  );                     
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

        onMouseleave: function (e) {  
            if(this.allowDraw) {
                this.goOn = true;          
            }
            this.finish();
        },

        onMousemove: function(e) {
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop; 
            
            this.cursorcontext.clearRect(0, 0, 
                 this.cursorcanvas.width(), this.cursorcanvas.height());
            this.cursorcontext.beginPath();
            this.cursorcontext.arc(x, y, this.cursorcontext.radius, 0, 2 * Math.PI, false);            
            this.cursorcontext.stroke();

            if (!this.mousedown) {
                return;
            }
            
            this.drawLine(x,y);           

            var line = {'x': x, 'y': y};
            this.curve.lines.push(line);
            this.curve.start = {'x': this.prevX, 'y': this.prevY};

            this.prevX = x;
            this.prevY = y;

            data = JSON.stringify(this.curve);
            session.user.sendMessage('new_curve',this.curve);            
            this.curve.lines = [];
        },

        onMouseover: function (e) {                
            if (this.allowDraw) {        
                var x = e.pageX - this.offsetLeft;
                var y = e.pageY - this.offsetTop;
                this.context.moveTo(x, y);
                this.context.beginPath();      
                this.goOn = false;
            }
        },

        onMouseup: function (e) {
            this.mousedown = false;
            this.allowDraw = false;
            this.goOn = false;
            this.finish();            
        },

        onNewCurve: function (data) {
            curve = data

            if (curve.clear) {
                this.clear();
                return;
            }

            this.context.beginPath();
            this.context.moveTo(curve.start.x, curve.start.y);
            this.context.strokeStyle = curve.color;
            this.context.lineWidth = curve.width;
            this.context.lineTo(curve.lines[0].x, curve.lines[0].y);            
            this.context.stroke();            
            this.context.closePath();
        },   

        onPressEraser: function() {
            if (!this.eraser) {
                this.eraser = true;
                this.context.strokeStyle = '#ffffff';
                $('.js-eraser').addClass('game__eraser-on');
            }
            else {
                this.eraser = false;
                this.context.strokeStyle = $('.js-buttoncolor').val();
                $('.js-eraser').removeClass('game__eraser-on');
            }

        },

        initialize: function () {     
            session.user.on('new_curve', _.bind(this.onNewCurve, this));            
            this.defaultWidth = 10;
            this.defaultColor = '#000000';                          
            this.allowDraw = false;
            this.goOn = false;
            this.render();
        },

        initializeCanvas: function() {
            canvas = this.$('.js-canvas');
            this.cassandra = $('.js-cassandra');
            this.paintarea = $('.js-paintarea');
            canvas.get(0).width = this.paintarea.width();
            canvas.get(0).height = this.paintarea.height();
            context = canvas.get(0).getContext('2d');
            context.lineWidth = this.defaultWidth;            
            this.$('.js-widthselect').val(this.defaultWidth.toString());
            this.$('.js-buttoncolor').val('#000000');
            context.lineJoin = "round";
            context.lineCap = "round";
            this.canvas = canvas;
            this.context = context;    
            if (session.user.get('role') == 'artist')  {                 
                this.paintarea.on('mousemove', _.bind(this.onMousemove, this));                  
            }            
        },

        initializeCursorCanvas: function() {
            cursorcanvas = this.$('.js-cursorcanvas');
            cursorcanvas.get(0).width = this.paintarea.width();
            cursorcanvas.get(0).height = this.paintarea.height();
            cursorcontext = cursorcanvas.get(0).getContext('2d');
            cursorcontext.radius = this.context.lineWidth / 2;
            cursorcontext.fillStyle = '#ffffff';
            cursorcontext.lineWidth = 2;            
            if (session.user.get('role') == 'artist')  {
                cursorcanvas.addClass('paintarea__canvas-artist');                
            }
            else {
                cursorcanvas.removeClass('paintarea__canvas-artist');
            }
            this.cursorcontext = cursorcontext;
            this.cursorcanvas = cursorcanvas;
        },


        calculateOffset: function () {
            var canvasRectangle = this.canvas.get(0).getBoundingClientRect();
            this.offsetLeft = canvasRectangle.left + window.scrollX;
            this.offsetTop = canvasRectangle.top + window.scrollY;
        },

        clear: function() {
            this.context.fillStyle = '#ffffff';
            this.context.fillRect(0, 0, this.canvas.width(), this.canvas.height());            
        },

        drawLine: function (x,y) {
            this.context.lineTo(x,y);
            this.context.stroke();         
        }, 

        render: function () {
            this.initializeCanvas();
            this.initializeCursorCanvas();
            this.calculateOffset();
        },

        show: function () {
            var gameDiv = $('.game').parent();
            gameDiv.removeAttr('style');
            this.calculateOffset();
        },

        hide: function() {
            session.user.off('new_curve');  
            this.paintarea.off('mousemove');
            this.clear();
            this.cassandra.off('mouseup');
            this.cassandra.off('mousemove');
        },

        finish: function() {   
            this.paintarea.off('mouseleave');                        
            if (! this.allowDraw ) {
                this.cassandra.off('mouseup');
                this.cassandra.off('mouseleave');
            }
            this.context.closePath();       
        }

    });

    return PaintareaView;
});