 
var app = {
    initialize: function() {
		$(document).ready(function(){
			angular.bootstrap(document, ['mnTouchTest']);
		});
    }
};

app.initialize();

var mnTouchTest = angular.module('mnTouchTest', ['mn']);

mnTouchTest.controller('test', ['$scope', function($scope){
	$scope.secureTap = function($event){
		alert('secure tap');
		console.log('secure tap: %o', $event);
	};

	$scope.hold = function($event){
		alert('hold');
		console.log('hold: %o', $event);
	};
}]);




		