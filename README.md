mnTouch
=======

Simple AngularJS directive for fast touch events (tap and swipe).

## Why?
Well, I'm working on a mobile project and I have to create a Cordova app that works smoothly on Android (4.1.*+), iOS (7+) and Windows Phone (8.0+).

I tried ngTouch, Quo.js, Hammer.js, ecc. but nothing reached the performances (and the cross-platform portability as well) I wanted, so I decided to write my own directive: **really fast** and **really tested** on many devices.

## Usage
Nothing simpler.
This directive's module is 'ng', the main one, so you don't need to add any particular dependency to your module.
	
	var module = angular.module('yourModule', []);


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

**Default threshold is 10.**
	
	<div 
		mn-touch 
		threshold=“30”
		secure-tap=“yourFunction()" 
		swipe-left="yourSwipeLeftFunction()" >
	...
	</div>
	
### Event informations
And what about information? How can I call a `preventDefault()`? Here I am: from version 1.1.0 you can pass an event-informations object to your callback. Example:

	<div 
		mn-touch 
		swipe-left="yourSwipeLeftFunction($event)" >
	...
	</div>

As you can see, the *secure-tap* receive an object called `$event` containing all the informations you need to manage your touch event. I adopted the same standard used by *AngularJS* in terms of event-information objects.
Obviously, `$event` is optional and this is its structure:

	{		name: string, // event name
		target: object, // DOM target,
		threshold: number, // the threshold integer value,
		types: {
			start: string, // original touch start event name
			end: string, // original touch end event name
			cancel: string // original touch cancel event name, if exists
		},
		coords: {
			start: {x, y}, // couple of integer
			end: {x, y} // optional - tap event hasn't it
		},
		events: {
			start: object // original touch start event
			end: object // original touch end event - optional, as above
		}
	};


## Dependencies
This plugin needs **AngularJS** only (version 1.2.*+ for sure; other versions haven’t been tested yet, but I think this directive would run anyway).

No jQuery required (but you can use it).

## Version
Current version is 1.1.0.

**1.1.0**
- core improvements
- `$event` object (event infos) added and optionally wrappable

**1.0.4**
- threshold attribute added

**1.0.3**
- support for cancel events (touchcancel, MSPointerOut) added 
- dynamic handlers improved