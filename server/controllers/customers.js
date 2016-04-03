var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports = (function () {
	return {
		show: function(req,res) {
			Customer.find({}, function (err,friends) {
				if(err) {
					console.log(err);
				}
				else {
					res.json(friends);
				}
			})
		},
		create: function(req,res) {
			var customer = new Customer({name: req.body.name, created_at: req.body.created_at})
			customer.save(function (err) {
				if(err) {
					console.log(err);
				}
				else {
					console.log("Successfully added a customer!")
				}
			})
		},
		destroy: function(req,res) {
			Customer.remove({_id: req.body.id}, function (err) {
				if(err) {
					console.log(err);
				}
				else {
					console.log("Successfully removed a customer!");
				}
			})
		},
		thumbnail: function(req,res) {
			Customer.find({})
			.sort({'created_at': -1})
			.limit(3)
			.exec(function (err,customers) {
				if(err) {
					console.log(err);
				}
				else {
					res.json(customers);
				}
			})
		}
	}
})();