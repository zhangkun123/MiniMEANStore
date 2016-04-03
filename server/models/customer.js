var mongoose = require('mongoose');
var CustomerSchema = new mongoose.Schema({
	name: String,
	created_at: Date
})

mongoose.model('Customer', CustomerSchema);