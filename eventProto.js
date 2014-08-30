;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define('eventProto', [], factory);
    } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object' ) {
    	module.exports = factory();
    } else {
    	window['eventProto'] = factory();
    }
}(function () {
	
	var cache = {},
		slice = Array.prototype.slice;

	var each = function(arr, callback) {
		for(var i=0; i<arr.length; i++) {
			callback.call(arr, arr[i], i, arr);
		}
	};

	function eventProto() {

	}

	eventProto.prototype.on = function() {
		if(arguments.length < 2) {
			throw new Error('expect at least two parameter');
		}
		var listener = arguments[arguments.length - 1];
		for(var i=arguments.length-2; i>=0; i--) {
			var event = arguments[i];
			if(typeof event !== 'string') {
				throw new Error('event type ' + event + ' is not a string');
			}
			if(!cache[event]) {
				cache[event] = {
					callbacks: []
				};
			}
			cache[event].callbacks.push(listener);
		}
	};

	eventProto.prototype.off = function() {
		var args = slice.call(arguments), listener;
		if(typeof args[args.length - 1] == 'function') {
			listener = args.splice(args.length - 1, 1)[0];
		}
		each(args, function(event) {
			if(!cache[event]) {
				throw new Error(event + ' is not registered');
			}
			if(listener) {
				var callbacks = cache[event].callbacks;
				each(callbacks, function(callback, index) {
					if(callback.toString() === listener.toString()) {
						callbacks.splice(index, 1);
						return;
					}
				});
			}else {
				cache[event].callbacks = [];
			}
		});
	};

	eventProto.prototype.once = function(event, listener) {

	};

	eventProto.prototype.trigger = function(event) {
		if(!cache[event]) {
			throw new Error(event + ' is not registered');
		}
		var callbacks = cache[event].callbacks,
			args = slice.call(arguments, 1),
			self = this;
		each(callbacks, function(callback) {
			callback.call(self, args);
		});
	};

	return eventProto;

}));