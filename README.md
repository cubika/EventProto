# EventProto [![Build Status](https://travis-ci.org/cubika/EventProto.svg?branch=master)](https://travis-ci.org/cubika/EventProto)
Encapsulate event operation for both normal object and DomNodes.

## Usage
```javascript
var eventProto = require('eventProto'); // node
var eventProto = window.eventProto; // browser
define(['eventProto'], function(eventProto) { // amd
	...
});

function foo() {...} // Your function
extend(foo, eventProto); // extend its ability
foo.on('event', ...); // use the API
```
## API
### core
#### on(event1, [event2, ...], listener)
#### off(event, [event2, ...], [listener])
#### once(event, [event2, ...], listener)
#### trigger(event, arg1, arg2 ... )

### alias
#### dispatch = fire = emit = trigger
#### bind = on
#### unbind = off

## Support
+ support node/brower, amd/commonjs
+ support event on domNode and Javascript Object/Class
+ support dom builtin event type and custom event type
