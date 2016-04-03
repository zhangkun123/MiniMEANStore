var mongoose = require('mongoose');
var Order = mongoose.model('Order');

module.exports = (function () {
	return {
		show: function(req,res) {
			Order.find({}, function (err,orders) {
				if(err) {
					console.log(err);
				}
				else {
					res.json(orders);
				}
			})
		},
		create: function(req,res) {
			var order = new Order(
				{customer_name: req.body.customer_name,
				 product: req.body.product, 
				 quantity: req.body.quantity, 
				 created_at: req.body.created_at
				});
			order.save(function (err) {
				if(err) {
					console.log(err); 
				}
				else {
					console.log("Successfully added an order!");
				}Product.find({})
			.sort({'created_at': -1})
			.limit(5)
			.exec(function (err,products) {
				if(err) {
					console.log(err);
				}
				else {
					res.json(products);
				}
			})
			})
		},
		destory: function(req,res) {
			Order.remove({_id: req.body.id}, function (err) {
				if(err) {
					console.log(err);
				}
				else {
					console.log("Successfully removed an order")
				}
			})
		},
		thumbnail: function(req,res) {
			Order.find({})
			.sort({'created_at': -1})
			.limit(3)
			.exec(function (err,orders) {
				if(err) {
					console.log(err);
				}
				else {
					res.json(orders);
				}
			})
		}
	}
})();