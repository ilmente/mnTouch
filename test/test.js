
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
	$scope.secureTap = function(){
		alert('secure tap');
	};

	$scope.hold = function(){
		alert('hold');
	};
}]);




		