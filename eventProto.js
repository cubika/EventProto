;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define('eventProto', [], factory);
    } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object' ) {
    	module.exports = factory();
    } else {
    	window['eventProto'] = factory();
    }
}(function () {
	
	var slice = Array.prototype.slice;

	var each = function(arr, callback, context) {
		for(var i=0; i<arr.length; i++) {
			callback.call(context, arr[i], i, arr);
		}
	};

	function eventProto() {
		this._cache = {};
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
			if(!this._cache[event]) {
				this._cache[event] = {
					callbacks: []
				};
			}
			this._cache[event].callbacks.push(listener);
		}
	};

	eventProto.prototype.off = function() {
		var args = slice.call(arguments), listener;
		if(typeof args[args.length - 1] == 'function') {
			listener = args.splice(args.length - 1, 1)[0];
		}
		each(args, function(event) {
			if(!this._cache[event]) {
				throw new Error(event + ' is not registered');
			}
			if(listener) {
				var callbacks = this._cache[event].callbacks;
				each(callbacks, function(callback, index) {
					if(callback.toString() === listener.toString()) {
						callbacks.splice(index, 1);
						return;
					}
				});
			}else {
				this._cache[event].callbacks = [];
			}
		}, this);
	};

	eventProto.prototype.once = function() {
		var args = slice.call(arguments),
			listener = args.splice(args.length-1, 1)[0],
			self = this;
		self.on.apply(self, args.concat(function() {
			listener.call(self);
			self.off(args);
		}));
	};

	eventProto.prototype.trigger = function(event) {
		if(!this._cache[event]) {
			throw new Error(event + ' is not registered');
		}
		var callbacks = this._cache[event].callbacks,
			args = slice.call(arguments, 1),
			self = this;
		each(callbacks, function(callback) {
			callback.call(self, args);
		});
	};

	return eventProto;

}));