var eventProto = require('../eventProto.js'),
	assert = require('assert'),
	extend = require('../extend.js');

function Foo() {
	this.counter = 1;
	this.setCounter = function(counter) {
		this.counter = counter;
	}
}

var foo = new Foo();
extend(foo, eventProto.prototype);

describe('On', function() {
	
	it('should add one', function() {
		foo.setCounter(1);
		foo.on('add', function() {
			this.counter++;
		});

		foo.trigger('add');
		assert.equal(foo.counter, 2);
	});
});

describe('Off', function() {
	
	it('should have no handler', function() {
		foo.off('add');
		assert.equal(foo.counter, 2);
	});
});

describe('On -- Mulitple Event Types', function() {

	it('should add several times', function() {
		foo.setCounter(1);
		foo.on('add', 'increment', 'plus', function() {
			this.counter++;
		});

		foo.trigger('add');
		foo.trigger('increment');
		foo.trigger('plus');
		assert.equal(foo.counter, 4);
	});
});

describe('Off -- Mulitple Event Types', function() {
	it('should have no register for add, but remain for others', function() {
		foo.off('add');
		foo.trigger('add');
		assert.equal(foo.counter, 4);
		foo.trigger('plus');
		assert.equal(foo.counter, 5);
	});

	it('should remove all registers', function() {
		foo.off('add', 'increment', 'plus');
		foo.trigger('add');
		foo.trigger('plus');
		foo.trigger('increment');
		assert.equal(foo.counter, 5);
	})
})

describe('On -- Mulitple callbacks for one type', function() {

	it('should call every callback', function() {
		foo.setCounter(1);
		foo.on('add', function() {
			foo.counter += 103;
		});

		foo.on('add', function() {
			if(foo.counter > 100) {
				foo.counter %= 100;
			}
		});

		foo.on('add', function() {
			console.log("counter: " + this.counter);
		})
		foo.trigger('add');
		assert.equal(foo.counter, 4);
	});
});

describe('Off -- Mulitple callbacks for one type', function() {
	it('should remove specific callback', function() {
		foo.setCounter(1);
		foo.off('add', function() {
			if(foo.counter > 100) {
				foo.counter %= 100;
			}
		});

		foo.trigger('add');
		assert.equal(foo.counter, 104);
	});

	it('should remove all callbacks', function() {
		foo.setCounter(1);
		foo.off('add');
		foo.trigger('add');
		assert.equal(foo.counter, 1);
	});
});

describe('Once', function() {
	it('should call once', function() {
		foo.setCounter(1);
		foo.once('add', function() {
			this.counter++;
		});
		foo.trigger('add');
		assert.equal(foo.counter, 2);
		foo.trigger('add');
		assert.equal(foo.counter, 2);
	});
})