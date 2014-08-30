;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define('extend', [], factory);
    } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object' ) {
    	module.exports = factory();
    } else {
    	window['extend'] = factory();
    }
}(function () {
    //mixin obj2 to obj1's first prototype
	return function(obj1, obj2) {
		var proto1 = obj1.constructor.prototype;
		for(var key in obj2) {
			proto1[key] = obj2[key];
		}
	};
}));