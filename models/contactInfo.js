var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var collection = 'contactInfo';

var contactInfoSchema = new Schema({
	firstName: String,
	lastName: String,
	phoneNumbers: [String],
	emails: [String],
});

module.exports = {
	ContactInfo: mongoose.model(collection, contactInfoSchema),
	ContactInfoSchema: contactInfoSchema
}