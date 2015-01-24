mnTouch
=======

**Ultrafast AngularJS touch events directive (tap, hold and swipe)**

## Why?
Well, I'm working on a mobile project and I have to create a Cordova app that works smoothly on Android (4.1.*+), iOS (7+) and Windows Phone (8.0+).

I tried ngTouch, Quo.js, Hammer.js, ecc. but nothing reached the performances (and the cross-platform portability as well) I wanted, so I decided to write my own directive: **really fast** and **really tested** on many devices.

## Usage
Nothing simpler.
This directive's module is '**mn**': add it to your module dependencies.
	
	var module = angular.module('yourModule', ['mn']);


### Tap
	<div 
		mn-touch 
		tap="yourFunction()" >
	...
	</div>


### Secure tap
	<div 
		mn-touch 
		secure-tap=“yourFunction()" >
	...
	</div>


### Hold
	<div 
		mn-touch 
		hold=“yourFunction()" >
	...
	</div>


### Swipe (left, right, up, down)
	<div 
		mn-touch 
		swipe-left=“yourFunction()" >
	...
	</div>


### Mixed events
	<div 
		mn-touch 
		secure-tap=“yourFunction()" 
		swipe-left="yourSwipeLeftFunction()" 
		swipe-down="yourSwipeDownFunction()" >
	...
	</div>

Maybe you're asking why I've implemented 2 different taps:
- **tap** is faster and doesn't perform any check if the target element (or the parent) has other touch event handlers attached on it, so it's fired immediately; no other event will be fired, so use it on elements that need to handle this event only;
- **secure-tap** is a couple of milliseconds slower than *tap* and performs a check before being fired. In this case, you can attach *secure-tap* and *swipe-...* events to the same element (or html tree), without any risk.

Obviously, you can use it with any html element other than div.

### Threshold
If you want to change the edge between *secure-tap* and *swipe-…* events, you can do it using the *threshold* attribute. It represents the number of offset-points (between the start and the end of the touch) under which the event is recognized as a *secure-tap*. If the offset is higher than *threshold*, the event will be processed as a *swipe-…* depending on the direction.
*Hold* event also responds to this rule, as the *secure-tap* event does.

**Default threshold is 10.**
	
	<div 
		mn-touch 
		threshold=“30”
		secure-tap=“yourFunction()" 
		swipe-left="yourSwipeLeftFunction()" >
	...
	</div>
	
### Holdfor
If you want to change the edge between *secure-tap* and *hold* events, you can do it using the *holdfor* attribute. It represents the number of milliseconds over which the *secure-tap* event is recognized as a *hold*.

**Default holdfor is 500.**
	
	<div 
		mn-touch 
		holdfor=“600”
		secure-tap=“yourFunction()" 
		hold="yourHoldFunction()" >
	...
	</div>
	

### Event informations
And what about information? How can I call a `preventDefault()`? Here I am: from version 1.1.0 you can pass an event-informations object to your callback. Example:

	<div 
		mn-touch 
		swipe-left="yourSwipeLeftFunction($event)" >
	...
	</div>

As you can see, the *swipe-left* receives an object called `$event` containing all the informations you need to manage your touch event. I adopted the same standard used by *AngularJS* in terms of event-information objects.
Obviously, `$event` is optional and this is its structure:

	// tap only
	{
		name: string, // event name
		target: object, // DOM element targeted by the directive,
		threshold: number, // the threshold integer value
		holdfor: number, // the holdfor integer value
		isRunning: boolean, // always false - event cycle is ended
		isSecure: boolean, // always false - tap is not secure (see below)
		types: {
			start: string, // original touch start event name
			move: string, // original touch move event name
			end: string, // original touch end event name
			cancel: string // original touch cancel event name, if exists
		},
		coords: {
			start: {x, y}, // couple of integer
		},
		events: {
			start: object // original touch start event
		}
	}
	
	// secure-tap, hold, swipe-*
	{
		name: string, // event name
		target: object, // DOM element targeted by the directive,
		threshold: number, // the threshold integer value,
		holdfor: number, // the holdfor integer value
		isRunning: boolean, // always false - event cycle is ended
		isSecure: boolean, // always true - secure-tap and swipe-* are secure (see below)
		types: {
			start: string, // original touch start event name
			move: string, // original touch move event name
			end: string, // original touch end event name
			cancel: string // original touch cancel event name, if exists
		},
		coords: {
			start: {x, y}, // couple of integer
			end: {x, y} // couple of integer
		},
		events: {
			start: object // original touch start event
			end: object // original touch end event
		}
		directionX: number, // x difference between end point and start point
		directionY: number, // y difference between end point and start point
		offsetX: number, // absolute value of directionX
		offsetY: number, // absolute value of directionY
	}


## Dependencies
This plugin needs **AngularJS** only (version 1.2.*+ for sure; other versions haven’t been tested yet, but I think this directive would run anyway).

No jQuery required (but you can use it).

## Version
Current version is 1.2.2.

**1.2.2**
- bower.json added (thanks to [DEllingsworth](https://github.com/DEllingsworth))

**1.2.1**
- documentation updated
- minor bugfixing

**1.2.0**
- default module name changed from 'ng' (not supported anymore for external components) to 'mn'
- hold event added (not tested on WindowsPhone yet... sorry!)
- holdfor attribute added

**1.1.1**
- new event handling system

**1.1.0**
- core improvements
- `$event` object (event infos) added and optionally wrappable

**1.0.4**
- threshold attribute added

**1.0.3**
- support for cancel events (touchcancel, MSPointerOut) added 
- dynamic handlers improved