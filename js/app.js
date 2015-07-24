var myApp = angular.module('myApp', ['ui.router', 'naif.base64']);

myApp
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/login');

	$stateProvider
	.state('login', {
		url: '/login',
		templateUrl: 'views/login.html',
		controller: 'LoginCtrl',
		authenticate: false
	})
	.state('lista', {
		url: '/lista',
		templateUrl: 'views/lista.html',
		controller: 'ListaCtrl',
		authenticate: true
	})
	.state('new', {
		url: '/new',
		templateUrl: 'views/new.html',
		controller: 'ListaCtrl',
		authenticate: true
	})

}])
.run(['$rootScope', '$http', '$state', 'Account', 'DOMAIN', function($rootScope, $http, $state, Account, DOMAIN){
	$rootScope.DOMAIN = DOMAIN;
	var token = Account.getToken();

	if (token) {
		$http.defaults.headers.common['auth_token'] = token;
	}

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && !Account.getToken()){
        // User isn’t authenticated
        $state.transitionTo('login');
        event.preventDefault();
      }
    });
}]);
