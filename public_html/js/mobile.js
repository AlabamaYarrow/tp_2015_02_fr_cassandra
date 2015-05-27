//var ws = new WebSocket('/api/v1/mobilegame');

var canvas = this.$('.js-canvas');
canvas.get(0).width = this.$('.paintarea-mobile').width();
canvas.get(0).height = this.$('.paintarea-mobile').height();

var context = canvas.get(0).getContext('2d');

canvas.on('touchmove', function() {
    context.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16); 
    context.fillRect(0, 0, canvas.width(), canvas.height());
});

canvas.on('touchend', function() {
    console.log('Sending:');
    console.log(JSON.stringify({color: context.fillStyle}));
    //ws.send(JSON.stringify({color: context.fillStyle}));
})

// ws.on('message', function() {    
// })