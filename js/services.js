var myApp = angular.module('myApp');

myApp
.service('Account', ['$http', '$state', function($http, $state){
	var that = this;
	this.email;
	this.password;

	this.login = function() {
		$http
		.post('http://104.236.63.176/sessions', {
			session: {
				email: this.email,
				password: this.password
			}
		})
		.success(function(data) {
			$http.defaults.headers.common['auth_token'] = data.auth_token;
			localStorage.setItem('token', data.auth_token);
			$state.go('lista');
		})
		.error(function(data) {
			alert(data.errors);
		})
		.finally(function() {
			that.email = '';
			that.password = '';
		})
	};

	this.getToken = function() {
		return localStorage.getItem('token');
	};
}])
.service('Captures', ['$http', function($http){
	that = this;
	this.capture = {};
	this.captures = [];
	this.url = 'http://104.236.63.176/v1/captures';

	this.cget = function() {
		$http.get(this.url)
		.success(function(data) {
			that.captures = data;
		});
	};

	this.get = function() {
		$http.get(this.url + id)
		.success(function(data) {
			that.capture = data;
		});
	};

	this.create = function() {
		$http.post(this.url, {
			capture: {
				comment: this.form.comment
			},
			image: this.form.image
		})
		.success(function() {
			console.log('Creado');
		})
	};

	this.update = function() {
		$http.patch(this.url + id, {
			capture: {
				comment: this.form.comment
			},
			image: this.form.image
		})
		.success(function() {
			console.log('Actualizado');
		})
	};

	this.delete = function() {
		$http.delete(this.url + id)
		.success(function() {
			console.log('Eliminado');
		})
	};
}])
