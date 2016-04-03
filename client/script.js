
//  inject the ngRoute dependency in the module.
var myAppModule = angular.module('myApp', ['ngRoute']);
//  use the config method to set up routing:
myAppModule.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/dashboard.html'
    })
    .when('/products',{
        templateUrl: 'partials/products.html'
    })
    .when('/orders',{
        templateUrl: 'partials/orders.html'
    })
    .when('/customers',{
        templateUrl: 'partials/customers.html'
    })
    .when('/settings',{
        templateUrl: 'partials/settings.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
  
myAppModule.factory('customerFactory', function ($http) {
	var customers = [];
	var factory = {};

	factory.getCustomers = function (callback) {
		$http.get('/customers').success(function (output) {
			customers = output;
			callback(customers);
		})
	}

	factory.addCustomer = function(info) {
		$http.post('/customers/new', info).success();
	}

	factory.removeCustomer = function(customer_id) {
		$http.post('/customers/destroy', {id: customer_id}).success();
	}

	return factory;
})

myAppModule.controller('customersController', function ($scope, customerFactory) {

	$scope.customers = [];
	$scope.message = "";
	customerFactory.getCustomers(function (data) {
		$scope.customers = data;
	});

	$scope.addCustomer = function () {
		$scope.message = "";
		for(i in $scope.customers) {
			if($scope.customers[i].name == $scope.newCustomer.name) {
				$scope.newCustomer = {};
				$scope.message = "Already Registered User!"
				return;
			}
		}
		$scope.newCustomer.created_at = Date.now();
		customerFactory.addCustomer($scope.newCustomer);
		$scope.newCustomer = {};

		customerFactory.getCustomers(function (data) {
			$scope.customers = data;
		});
	}

	$scope.removeCustomer = function (customer) {
		$scope.message = "";
		customerFactory.removeCustomer(customer._id);
		customerFactory.getCustomers(function (data) {
			$scope.customers = data;
		});
	}
})

myAppModule.factory('orderFactory', function ($http) {
	var orders = [];

	var factory = {};

	factory.getOrders = function (callback) {
		$http.get('/orders').success(function(output) {
			orders = output;
			callback(orders);
		})
	}

	factory.addOrder = function(info1, info2) {
		$http.post('/orders/new', info1).success();
		$http.post('/products/update', info2).success();
	}

	return factory;
})

myAppModule.controller('ordersController', function ($scope, orderFactory, productFactory) {

	$scope.orders = [];

	$scope.products = [];

	$scope.message = "";

	productFactory.getProducts(function (data) {
		$scope.products = data;
	});

	orderFactory.getOrders(function (data) {
		$scope.orders = data;
	});

	$scope.addOrder = function () {
		$scope.message = "";
		for(i in $scope.products) {
			if($scope.products[i].name == $scope.newOrder.product) {
				if($scope.products[i].quantity < $scope.newOrder.quantity) {
					$scope.message = "Not enough products in storage!";
					return;
				}
				var quantity  = Number($scope.products[i].quantity) - Number($scope.newOrder.quantity);
			}
		}
		$scope.newOrder.created_at = Date.now();
		orderFactory.addOrder($scope.newOrder, {name: $scope.newOrder.product, quantity: quantity});
		$scope.newOrder = {};
		orderFactory.getOrders(function (data) {
			$scope.orders = data;
		});

		productFactory.getProducts(function (data) {
			$scope.products = data;
		});
	}
})

myAppModule.factory('productFactory', function ($http) {
	var products = [];

	var factory = {};

	factory.getProducts = function (callback) {
		$http.get('/products').success(function(output) {
			products = output;
			callback(products);
		})
	}

	factory.addProduct = function(info) {
		$http.post('/products/new', info).success();
	}

	factory.updateProduct = function(info) { 
		$http.post('/products/update', info).success();
	}
	return factory;
})

myAppModule.controller('productsController', function ($scope, productFactory) {

	$scope.products = [];
	productFactory.getProducts(function (data) {
		$scope.products = data;
	});

	$scope.addProduct = function () {
		for(i in $scope.products) {
			if($scope.products[i].name == $scope.newProduct.name) {
				var quantity = Number($scope.products[i].quantity) + Number($scope.newProduct.quantity);
				productFactory.updateProduct({name: $scope.newProduct.name, quantity: quantity});
				$scope.newProduct = {};
				productFactory.getProducts(function (data) {
					$scope.products = data;
				});
				return;
			}
		}
		$scope.newProduct.created_at = Date.now();
		productFactory.addProduct($scope.newProduct);
		$scope.newProduct = {};
		productFactory.getProducts(function (data) {
			$scope.products = data;
		});
	}
})

myAppModule.factory('dashboardFactory', function ($http) {
	var products = [];
	var customers = [];
	var orders = [];

	var factory = {};

	factory.getData = function (callback) {
		$http.get('/products').success(function(output) {
			products = output;
		})
		$http.get('/customers/thumbnail').success(function(output) {
			customers = output;
		})
		$http.get('/orders/thumbnail').success(function(output) {
			orders = output;
		})
		callback(products,customers,orders);
	}

	factory.getProducts = function (callback) {
		$http.get('/products').success(function(output) {
			products = output;
			callback(products);
		})
	}

	factory.getCustomers = function (callback) {
		$http.get('/customers/thumbnail').success(function(output) {
			customers = output;
			callback(customers)
		})
	}

	factory.getOrders = function (callback) {
		$http.get('/orders/thumbnail').success(function(output) {
			orders = output;
			callback(orders);
		})
	}

	return factory;
})

myAppModule.controller('dashboardsController', function ($scope, dashboardFactory) {

	// $scope.products = dashboardFactory.getProducts();
	dashboardFactory.getCustomers(function(customers) {
		$scope.customers = customers;
	});
	dashboardFactory.getOrders(function(orders) {
		$scope.orders = orders;
	});
	dashboardFactory.getProducts(function(products) {
		$scope.products = products
	})

	// dashboardFactory.getData(function (products, customers, orders) {
	// 	$scope.products = products;
	// 	$scope.customers = customers;
	// 	$scope.orders = orders;
	// });

	console.log($scope.products);
	console.log($scope.customers);
	console.log($scope.orders);
})

