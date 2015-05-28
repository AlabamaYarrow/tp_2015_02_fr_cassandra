jQuery(function($) {
	var canvas = $('.js-canvas');
	var supported = $('.js-supported');
	canvas.get(0).width = $('.js-paintarea-mobile').width();
	canvas.get(0).height = $('.js-paintarea-mobile').height();

	var webSocketOrigin = 'ws://' + document.location.host;
	var webSocket = new WebSocket(webSocketOrigin + '/api/v1/console/');
	
	webSocket.onerror = function() {
		alert(JSON.stringify(arguments));
	};

	var context = canvas.get(0).getContext('2d');

	function onend() {
		var message = {
			type: 'update',
			body: {
				color: context.fillStyle
			}
		};
		webSocket.send(JSON.stringify(message));		
	}

	function onmove() {
		context.fillStyle = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16); 
		context.fillRect(0, 0, canvas.width(), canvas.height());
	}

	if (window.TouchEvent) {
    	canvas.on('touchmove', onmove);
    	canvas.on('touchend', onend);
    	supported.append('Touch ');
	}

	if(window.MSPointerEvent) {
		canvas.on('MSPointerMove', onmove);
		canvas.on('MSPointerUp', onend);
		supported.append('Pointer ');
	}

	if (window.DeviceOrientationEvent) {
		
		supported.append('DeviceOrientation ');
	    
	}

	if (window.DeviceMotionEvent) {
		supported.append('DeviceMotion ');
	}

});
