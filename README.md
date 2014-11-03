mnTouch
=======

Simple AngularJS directive for fast touch events (tap and swipe)

# Why?
Well, I'm working on a mobile project and I have to create a Cordova app that works smoothly on Android (4.1.*+), iOS (7+) and Windows Phone (8.0+).

I tried ngTouch, Quo.js, Hammer.js, but nothing reached the performances (and the cross-platform portability as well) I wanted, so I decided to write my own directive: **really fast** and **tested** on many devices.

# Usage
Nothing simpler.


### Tap
	<div 
		mn-touch 
		tap="yourFunction()" >


### Secure tap
	<div 
		mn-touch 
		secure-tap=“yourFunction()" >


### Swipe (left, right, top, bottom)
	<div 
		mn-touch 
		swipe-left=“yourFunction()" >


### Mixed events
	<div 
		mn-touch 
		secure-tap=“yourFunction()" 
		swipe-left="yourSwipeLeftFunction()" 
		swipe-right="yourSwipeRightFunction()" >

Maybe you're asking why I have implemented 2 different taps:
- **tap** is faster and doesn't perform any check if the target element (or the parent) has other touch event handlers attached on it, so it's fired immediately;
- **secure-tap** is a couple of milliseconds slower than *tap* and performs a check before being fired. In this case, you can attach *tap* and *swipe* events to the same element (or html tree), without any risk.

Obviously, you can use it with any html element other than div. Enjoy! ;) 