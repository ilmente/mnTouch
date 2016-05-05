 
var app = {
    initialize: function() {
		$(document).ready(function(){
			angular.bootstrap(document, ['mnTouchExample']);
		});
    }
};

app.initialize();

var mnTouchExample = angular.module('mnTouchExample', ['mn']);

mnTouchExample.controller('example', ['$scope', function($scope){
	$scope.log = function($event){
		alert('event: ' + $event.name);
		console.log($event.name + ': %o', $event);
	};
}]);




		
