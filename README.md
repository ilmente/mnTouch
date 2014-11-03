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
		class="my-item" ... 
		mn-touch 
		tap="myFunction()" >


### Secure tap
	<div 
		class="my-item" ... 
		mn-touch 
		secure-tap=“myFunction()" >


### Swipe (left, right, top, bottom)
	<div 
		class="my-item" ... 
		mn-touch 
		swipe-left=“myFunction()" >


### Mixed events
	<div 
		class="my-item" ... 
		mn-touch 
		secure-tap=“myFunction()" 
		swipe-left="mySwipeLeftFunction()" 
		swipe-right="mySwipeRightFunction()" >

Maybe yor're asking why I have implemented 2 different taps:
- **tap** is faster and doesn't perform any check if the target element (or the parent) has other touch event handlers attached on it, so it's fired immediately;
- **secure-tap** is a couple of milliseconds slower than *tap* and performs a check before being fired. In this case, you can attach *tap* and *swipe* events to the same element (or html tree), without any risk.