var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	username: String,
	email: String,
	passwordhash: String,
	phone: String
}),
User = mongoose.model('User', userSchema);

module.exports = User;