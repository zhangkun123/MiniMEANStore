var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports = (function () {
	return {
		show: function(req,res) {
			Product.find({}, function (err,products) {
				if(err) {
					console.log(err);
				}
				else {
					res.json(products);
				}
			})
		},
		create: function(req,res) {
			var product = new Product(
				{name: req.body.name,
				 image: req.body.image,
				  description: req.body.description,
				   quantity: req.body.quantity,
				    created_at: req.body.created_at
				})
			product.save(function (err) {
				if(err) {
					console.log(err);
				}
				else {
					console.log("Successfully added a product!")
				}
			})
		},
		destroy: function(req,res) {
			Product.remove({_id: req.body.id}, function (err) {
				if(err) {
					console.log(err);
				}
				else {
					console.log("Successfully removed a product!");
				}
			})
		},
		update: function(req,res) {
			Product.update({name: req.body.name}, {quantity: req.body.quantity}, function(err) {
				if(err) {
					console.log(err);
				}
				else {
					console.log("Successfully updated a product")
				}
			})
		},
		thumbnail: function(req,res) {
			Product.find({})
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
		}
	}
})();