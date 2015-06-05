define([
    'backbone'
], function(
    Backbone
){

  sync = function(method, model, options) {
	
	var methodMap = {
	    'create': 'POST',
		  'update': 'POST',
	    'patch':  'PATCH',
	    'delete': 'DELETE',
	    'read':   'GET'
  	};

    var type = methodMap[method];

    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    var params = {type: type, dataType: 'json'};

    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }
    
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  var noXhrPatch = typeof window !== 'undefined' && !!window.ActiveXObject && !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  return sync;

});