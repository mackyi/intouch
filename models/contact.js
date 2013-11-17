var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId
    ContactInfoPartial = require('./contactInfoPartial')

var collection = 'contact';

var contactSchema = new Schema({
	userId: ObjectId,
	contactInfo: ContactInfoPartial,
	contactLog: [{
		date: Date,
		text: String
	}],
	tags: [String],
	notes: String,
	status: String
});


var StatusType = {
	INBOX: "inbox",
	ARCHIVE: "archive",
	LATER: "later"
}

module.exports = {
	Contact: mongoose.model(collection, contactSchema),
	ContactSchema: contactSchema,
	StatusType: StatusType
}