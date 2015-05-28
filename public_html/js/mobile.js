jQuery(function($) {
	var canvas = $('.js-canvas');
	canvas.get(0).width = $('.paintarea-mobile').width();
	canvas.get(0).height = $('.paintarea-mobile').height();
	var header = $('.js-header');

	var webSocketOrigin = 'ws://' + document.location.host;
	if (canvas.is(':visible')) {
		var webSocket = new WebSocket(webSocketOrigin + '/api/v1/console/');
	} else {
		var webSocket = new WebSocket(webSocketOrigin + '/api/v1/console/?init=1');
	}
	webSocket.onerror = function() {
		alert(JSON.stringify(arguments));
	};

	var context = canvas.get(0).getContext('2d');

	canvas.on('touchmove', function() {
		context.fillStyle = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16); 
		context.fillRect(0, 0, canvas.width(), canvas.height());
	});

	canvas.on('touchend', function() {
		var message = {
			type: 'update',
			body: {
				color: context.fillStyle
			}
		};
		webSocket.send(JSON.stringify(message));
	});

	webSocket.onmessage = function(event) {
		var data = JSON.parse(event.data);
		console.log('mes', data);
		header.css({
			color: data.body.color
		});
	};
});
