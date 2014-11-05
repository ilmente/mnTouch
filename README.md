mnTouch
=======

Simple AngularJS directive for fast touch events (tap and swipe).

## Why?
Well, I'm working on a mobile project and I have to create a Cordova app that works smoothly on Android (4.1.*+), iOS (7+) and Windows Phone (8.0+).

I tried ngTouch, Quo.js, Hammer.js, ecc. but nothing reached the performances (and the cross-platform portability as well) I wanted, so I decided to write my own directive: **really fast** and **really tested** on many devices.

## Usage
Nothing simpler.
Include this directive in your project and add it to the dependencies of your module.
	
	var module = angular.module('yourModule', ['mnTouch']);


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

## Dependencies
This plugin needs **AngularJS** only (version 1.2.*+ for sure; other versions haven’t been tested yet, but I think this directive would run anyway).

No jQuery required (but you can use it).

## Version
The current version is 1.0.4.

**1.0.4**
- added threshold attribute;

**1.0.3**
- added support for cancel events (touchcancel, MSPointerOut);
- dynamic handlers improved;