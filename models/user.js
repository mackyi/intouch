var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId
    ContactInfoPartial = require('./contactInfoPartial')

var collection = 'user';

var userSchema = new Schema({
	username: String,
	password: String,
	contactInfo: ContactInfoPartial
});

module.exports = {
	User: mongoose.model(collection, userSchema),
	UserSchema: userSchema
}
