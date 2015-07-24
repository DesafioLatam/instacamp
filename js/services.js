var myApp = angular.module('myApp');

myApp
.service('Account', ['$http', '$state', 'DOMAIN', function($http, $state, DOMAIN){
	var that = this;
	this.email;
	this.password;
	this.userid;
	this.url = DOMAIN + '/sessions/';
	this.loading = false;

	this.login = function() {
		this.loading = true;
		$http
		.post(this.url, {
			session: {
				email: this.email,
				password: this.password
			}
		})
		.success(function(data) {
			$http.defaults.headers.common['auth_token'] = data.auth_token;
			localStorage.setItem('token', data.auth_token);
			localStorage.setItem('userid', data.id);
			$state.go('lista');
		})
		.error(function(data) {
			alert(data.errors);
		})
		.finally(function() {
			that.email = '';
			that.password = '';
			that.loading = false;
		});
	};

	this.logout = function() {
		var id = localStorage.getItem('userid');
		$http.delete(this.url + id)
		.success(function() {
			console.log('Logout');
			$state.go('login');
		})
		.finally(function() {
			localStorage.clear();
		});
	}

	this.getToken = function() {
		return localStorage.getItem('token');
	};
}])
.service('Captures', ['$http', '$state', 'DOMAIN', function($http, $state, DOMAIN){
	var that = this;
	this.capture = {};
	this.captures = [];
	this.form = {};
	this.url = DOMAIN + '/v1/captures/';
	this.loading = false;

	this.cget = function() {
		this.loading = true;
		$http.get(this.url)
		.success(function(data) {
			that.captures = data;
		})
		.finally(function() {
			that.loading = false;
		});
	};

	this.get = function() {
		this.loading = true;
		$http.get(this.url + id)
		.success(function(data) {
			that.capture = data;
		})
		.finally(function() {
			that.loading = false;
		});
	};

	this.create = function() {
		this.loading = true;
		console.log(this.form.comment);
		console.log(this.form.image);

		$http.post(this.url, {
			capture: {
				comment: this.form.comment
			},
			image: this.form.image
		})
		.success(function() {
			console.log('Creado');
		})
		.finally(function() {
			that.loading = false;
			$state.go('lista');
		});
	};

	this.update = function(id) {
		this.loading = true;
		$http.patch(this.url + id, {
			capture: {
				comment: this.form.comment
			},
			image: this.form.image
		})
		.success(function() {
			console.log('Actualizado');
		})
		.finally(function() {
			that.loading = false;
		});
	};

	this.delete = function(id) {
		$http.delete(this.url + id)
		.success(function() {
			console.log('Eliminado');
		})
		.finally(function() {
			that.cget();
		});
	};
}])
