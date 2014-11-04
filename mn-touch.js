/*
 * 
 * mnTouch, version 1.0.3
 * Simple AngularJS directive for fast touch events (tap and swipe)
 * 
 * by Alessandro Bellini - ilmente
 *
 */ 

angular.module('ng').directive('mnTouch', [function(){
	var _touch = function(scope, element, attrs){
		var target = element[0];
		var threshold = 10;
		
		var fn = function(eventName){
			if (!!attrs[eventName]){
				scope.$eval(attrs[eventName]);
				scope.$apply();
			}
		};
		
		var eventInfos = {
			startType: 'mousedown',
			endType: 'mouseup',
			cancelType: '',
			getCoords: function(event){
				return {
					x: event.pageX || 0,
					y: event.pageY || 0
				}
			}
		};
		
		if (typeof window.ontouchstart !== 'undefined' 
			&& typeof window.ontouchend !== 'undefined'
			&& typeof window.ontouchcancel !== 'undefined'){
			eventInfos.startType = 'touchstart';
			eventInfos.endType = 'touchend';
			eventInfos.cancelType = 'touchcancel';
			eventInfos.getCoords = function(event){
				var coords = !!event 
					&& !!event.changedTouches 
					&& !!event.changedTouches.length > 0
					? event.changedTouches[0]
					: {};
				
				return {
					x: coords.pageX || event.pageX || 0,
					y: coords.pageY || event.pageY || 0
				}
			}
		} else if (window.navigator.pointerEnabled){
			eventInfos.startType = 'pointerdown';
			eventInfos.endType = 'pointerup';
		} else if (window.navigator.msPointerEnabled){
			eventInfos.startType = 'MSPointerDown';
			eventInfos.endType = 'MSPointerDown'; 
			eventInfos.cancelType = 'MSPointerOut';
		}
		
		if (!!attrs['tap']){
			target.addEventListener(eventInfos.startType, function(startEvent){
				fn('tap');
			}, false);
		} else {
			target.addEventListener(eventInfos.startType, function(startEvent){
				var startCoords = eventInfos.getCoords(startEvent);
				var eventEnded = false;
				
				var onEndEvent = function(endEvent){
					if (!eventEnded){
						eventEnded = true;
						target.removeEventListener(eventInfos.endType, onEndEvent, false);
						if (!!eventInfos.cancelType) target.removeEventListener(eventInfos.cancelType, onEndEvent, false);
					
						var endCoords = eventInfos.getCoords(endEvent);
						var directionX = endCoords.x - startCoords.x;
						var directionY = endCoords.y - startCoords.y;
						var offsetX = Math.abs(directionX);
						var offsetY = Math.abs(directionY);
			
						if (offsetX <= threshold && offsetY <= threshold) fn('secureTap');
						else if (offsetX >= offsetY) fn(directionX > 0 ? 'swipeRight' : 'swipeLeft');
						else fn(directionY > 0 ? 'swipeDown' : 'swipeUp');
					}
				};

				target.addEventListener(eventInfos.endType, onEndEvent, false);
				if (!!eventInfos.cancelType) target.addEventListener(eventInfos.cancelType, onEndEvent, false);
			}, false);
		}
	};
	
    return {
		restrict: 'A',
        link: _touch
    }
}]);