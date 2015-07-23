var myApp = angular.module('myApp');

myApp
.controller('LoginCtrl', ['$scope', 'Account', function($scope, Account){
	$scope.Account = Account;
}])
.controller('ListaCtrl', ['$scope', 'Captures', function($scope, Captures){
	$scope.Captures = Captures;
	Captures.cget();
}])
