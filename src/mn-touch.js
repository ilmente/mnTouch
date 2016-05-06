/**
 * 
 * @name: mnTouch
 * @version: 1.3.2
 * @description: Ultrafast AngularJS touch events directive (tap, hold and swipe)
 * @author: Alessandro Bellini - ilmente
 * @license: MIT
 *
 */

'use strict';

angular.module('mn', []).directive('mnTouch', ['$timeout', function($timeout) {
    var touchEngine = function(scope, element, attrs) {
        scope.$event = {
        	name: '',
            isSecure: false,
            isRunning: false,
            target: element[0],
            threshold: !!attrs.threshold ? attrs.threshold : 10,
            holdfor: !!attrs.holdfor ? attrs.holdfor : 500,
            types: {
                start: 'mousedown',
                move: 'mousemove',
                end: 'mouseup',
                cancel: ''
            },
            time: {},
            coords: {},
            events: {},
            directionX: 0,
            directionY: 0,
            offsetX: 0,
            offsetY: 0
        };

        var fn = function(eventName) {
            scope.$event.name = eventName;

            if (!!attrs[eventName]) {
                scope.$eval(attrs[eventName]);
                scope.$apply();
            }
        };

        var getCoords = function(event) {
            return {
                x: event.pageX || 0,
                y: event.pageY || 0
            }
        };

        if (typeof window.ontouchstart !== 'undefined' && typeof window.ontouchend !== 'undefined' && typeof window.ontouchcancel !== 'undefined') {

            scope.$event.types.start = 'touchstart';
            scope.$event.types.move = 'touchmove';
            scope.$event.types.end = 'touchend';
            scope.$event.types.cancel = 'touchcancel';

            getCoords = function(event) {
                var coords = !!event && !!event.changedTouches && !!event.changedTouches.length > 0 ? event.changedTouches[0] : {};

                return {
                    x: coords.pageX || event.pageX || 0,
                    y: coords.pageY || event.pageY || 0
                }
            }
        } else if (window.navigator.pointerEnabled) {
            scope.$event.types.start = 'pointerdown';
            scope.$event.types.move = 'pointermove';
            scope.$event.types.end = 'pointerup';
        } else if (window.navigator.msPointerEnabled) {
            scope.$event.types.start = 'MSPointerDown';
            scope.$event.types.move = 'MSPointerMove';
            scope.$event.types.end = 'MSPointerUp';
            scope.$event.types.cancel = 'MSPointerOut';
        }

        if (!!attrs['tap']) {
            scope.$event.isSecure = false;
            scope.$event.isRunning = false;

            var onStartEvent = function(startEvent) {
                scope.$event.events.start = startEvent;
                scope.$event.coords.start = getCoords(startEvent);
                fn('tap');
            };

            scope.$event.target.addEventListener(scope.$event.types.start, onStartEvent, false);
        } else {
            scope.$event.isSecure = true;

            var holdPromise = null;

            var onStartEvent = function(startEvent) {
                scope.$event.isRunning = true;
                scope.$event.time.start = new Date().getTime();
                scope.$event.events.start = startEvent;
                scope.$event.coords.start = getCoords(startEvent);

                if (!!attrs['hold']) {
                    holdPromise = $timeout(function() {
                        onEndEvent(scope.$event.events.move || startEvent);
                    }, scope.$event.holdfor, false);
                }
            };

            var onMoveEvent = function(moveEvent) {
                if (scope.$event.isRunning) {
                    scope.$event.events.move = moveEvent;
                }
            };

            var onEndEvent = function(endEvent) {
                if (!!holdPromise) $timeout.cancel(holdPromise);

                if (scope.$event.isRunning) {
                    scope.$event.isRunning = false;
                    scope.$event.time.end = new Date().getTime();
                    scope.$event.time.duration = scope.$event.time.end - scope.$event.time.start;
                    scope.$event.events.end = endEvent;
                    scope.$event.coords.end = getCoords(endEvent);
                    scope.$event.directionX = scope.$event.coords.end.x - scope.$event.coords.start.x;
                    scope.$event.directionY = scope.$event.coords.end.y - scope.$event.coords.start.y;
                    scope.$event.offsetX = Math.abs(scope.$event.directionX);
                    scope.$event.offsetY = Math.abs(scope.$event.directionY);

                    if (scope.$event.offsetX <= scope.$event.threshold && scope.$event.offsetY <= scope.$event.threshold) {
                        if (!!attrs['hold'] && scope.$event.time.duration >= scope.$event.holdfor) fn('hold');
                        else fn('secureTap');
                    } else if (scope.$event.offsetX >= scope.$event.offsetY) fn(scope.$event.directionX > 0 ? 'swipeRight' : 'swipeLeft');
                    else fn(scope.$event.directionY > 0 ? 'swipeDown' : 'swipeUp');
                }
            };

            scope.$event.target.addEventListener(scope.$event.types.start, onStartEvent, false);
            scope.$event.target.addEventListener(scope.$event.types.end, onEndEvent, false);
            if (!!scope.$event.types.cancel) scope.$event.target.addEventListener(scope.$event.types.cancel, onEndEvent, false);
            if (!!attrs['hold']) scope.$event.target.addEventListener(scope.$event.types.move, onMoveEvent, false);
        }
    };

    return {
        restrict: 'A',
        link: touchEngine
    }
}]);
