var myApp = angular.module('myApp');

myApp
.controller('LoginCtrl', ['$scope', '$stateParams', 'Account', function($scope, $stateParams, Account){
	$scope.Account = Account;
}])
.controller('ListaCtrl', ['$scope', 'Captures', function($scope, Captures){
	$scope.Captures = Captures;
	Captures.cget();
}])
