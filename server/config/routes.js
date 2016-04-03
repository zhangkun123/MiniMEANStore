var customers = require('./../controllers/customers');
var orders = require('./../controllers/orders');
var products = require('./../controllers/products');

module.exports = function(app) {
	// customers
	app.get('/customers', function (req,res) {
		customers.show(req,res);
	});

	app.post('/customers/new', function (req,res) {
		customers.create(req,res);
	});

	app.post('/customers/destroy', function (req,res) {
		customers.destroy(req,res);
	});

	// orders
	app.get('/orders', function (req,res) {
		orders.show(req,res);
	});

	app.post('/orders/new', function (req,res) {
		orders.create(req,res);
	});

	app.post('/orders/destroy', function (req,res) {
		orders.destroy(req,res);
	});

	// products
	app.get('/products', function (req,res) {
		products.show(req,res);
	});

	app.post('/products/new', function (req,res) {
		products.create(req,res);
	});

	app.post('/products/destroy', function (req,res) {
		products.destroy(req,res);
	});

	app.post('/products/update', function (req,res) {
		products.update(req,res);
	});

	// dashboards
	app.get('/products/thumbnail', function (req,res) {
		products.thumbnail(req,res);
	});

	app.get('/customers/thumbnail', function (req,res) {
		customers.thumbnail(req,res);
	});

	app.get('/orders/thumbnail', function (req,res) {
		orders.thumbnail(req,res);
	});
}