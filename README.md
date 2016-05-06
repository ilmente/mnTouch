# mn-touch
**Ultrafast AngularJS touch events directive (tap, hold and swipe)**

## Why?
Well, I'm working on a mobile project and I have to create a Cordova app that works smoothly on Android (4.1.*+), iOS (7+) and Windows Phone (8.0+).

I tried ngTouch, Quo.js, Hammer.js, ecc. but nothing reached the performances (and the cross-platform portability as well) I wanted, so I decided to write my own directive: **really fast** and **really tested** on many devices.

## Install
- bower: `bower install mn-touch`
- npm: `npm install mn-touch`
- by hand: *read below...*

## Usage
Nothing simpler.
This directive's module is '**mn**': add it to your module dependencies.
	
``` js
var module = angular.module('yourModule', ['mn']);
```

### Tap
``` html
<div 
	mn-touch 
	tap="yourFunction()" >
...
</div>
```

### Secure tap
``` html
<div 
	mn-touch 
	secure-tap="yourFunction()" >
...
</div>
```

### Hold
``` html
<div 
	mn-touch 
	hold="yourFunction()" >
...
</div>
```

### Swipe (left, right, up, down)
``` html
<div 
	mn-touch 
	swipe-left="yourFunction()" >
...
</div>
```

### Mixed events
``` html
<div 
	mn-touch 
	secure-tap="yourFunction()" 
	swipe-left="yourSwipeLeftFunction()" 
	swipe-down="yourSwipeDownFunction()" >
...
</div>
```

Maybe you're asking why I've implemented 2 different taps:
- **tap** is faster and doesn't perform any check if the target element (or the parent) has other touch event handlers attached on it, so it's fired immediately; no other event will be fired, so use it on elements that need to handle this event only;
- **secure-tap** is a couple of milliseconds slower than *tap* and performs a check before being fired. In this case, you can attach *secure-tap* and *swipe-...* events to the same element (or html tree), without any risk.

Obviously, you can use it with any html element other than div.

### Threshold
If you want to change the edge between *secure-tap* and *swipe-…* events, you can do it using the *threshold* attribute. It represents the number of offset-points (between the start and the end of the touch) under which the event is recognized as a *secure-tap*. If the offset is higher than *threshold*, the event will be processed as a *swipe-…* depending on the direction.
*Hold* event also responds to this rule, as the *secure-tap* event does.

**Default threshold is 10.**
	
``` html
<div 
	mn-touch 
	threshold="30"
	secure-tap="yourFunction()" 
	swipe-left="yourSwipeLeftFunction()" >
...
</div>
```
	
### Holdfor
If you want to change the edge between *secure-tap* and *hold* events, you can do it using the *holdfor* attribute. It represents the number of milliseconds over which the *secure-tap* event is recognized as a *hold*.

**Default holdfor is 500.**
``` html
<div 
	mn-touch 
	holdfor="600"
	secure-tap="yourFunction()" 
	hold="yourHoldFunction()" >
...
</div>
```

### Event informations
And what about information? How can I call a `preventDefault()`? Here I am: from version 1.1.0 you can pass an event-informations object to your callback. Example:

``` html
<div 
	mn-touch 
	swipe-left="yourSwipeLeftFunction($event)" >
...
</div>
```

As you can see, the *swipe-left* receives an object called `$event` containing all the informations you need to manage your touch event. I adopted the same standard used by *AngularJS* in terms of event-information objects.
Obviously, `$event` is optional and this is its structure:

``` js
{
	name: 'event-name', // event name
	target: {}, // DOM element targeted by the directive
	threshold: 10, // the threshold integer value
	holdfor: 500, // the holdfor integer value
	isRunning: false, // event status
	isSecure: true, // tap is not secure, all other evets are secure
	directionX: -15, // x difference between end point and start point
	directionY: 3, // y difference between end point and start point
	offsetX: 15, // absolute value of directionX
	offsetY: 3, // absolute value of directionY
	types: {
		start: 'touchstart', // original touch start event name
		move: 'touchmove', // original touch move event name
		end: 'touchend', // original touch end event name
		cancel: 'touchcancel' // original touch cancel event name, if exists
	},
	coords: {
		start: {x, y}, // couple of integer
		end: {x, y} // couple of integer
	},
	events: {
		start: {}, // original touch start event
		end: {} // original touch end event
	},
	time: {
		start: 123456000, // touch start time
		end: 123456700, // touch end time
		duration: 700 // touch duration
	}
}
```

## Dependencies
This plugin needs **AngularJS** only (version 1.2.*+ for sure; other versions haven’t been tested yet, but I think this directive would run anyway).

No jQuery required (but you can use it).

## Development
If you want to develop and then compress your edited version of this directive, you can use `npm`: 

``` bash
$ npm install # install module dependencies
$ npm run build # run compression task on source and output the dist files
```

## Known issues
- Google Chrome suggest to use deferred for long-task execution ([read more](https://bugs.chromium.org/p/chromium/issues/detail?id=574343)), but since I don't want to add any dependency to this plugin (except for Angular), I will live with this warning.

## License
This software is released under MIT license terms.

---

Have fun!

