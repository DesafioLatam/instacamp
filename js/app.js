var myApp = angular.module('myApp', ['ui.router']);

myApp
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/login');

	$stateProvider
	.state('login', {
		url: '/login',
		templateUrl: 'views/login.html',
		controller: 'LoginCtrl'
	})
	.state('lista', {
		url: '/lista',
		templateUrl: 'views/lista.html',
		controller: 'ListaCtrl'
	})

}])
.run(['$http', '$state', 'Account', function($http, $state, Account){
	var token = Account.getToken();
	if (token) {
		$http.defaults.headers.common['auth_token'] = token;
		$state.go('lista');
	}
}]);
