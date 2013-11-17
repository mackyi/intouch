// Module dependencies
var mongoose = require('mongoose'),
    Contact = require('./models/contact').Contact,
    User    = require('./models/user').User;

// connect to database
module.exports = {
  startup: function(dbToUse) {
    mongoose.connect(dbToUse);
    // Check connection to mongoDB
    mongoose.connection.on('open', function() {
      console.log('We have connected to mongodb');
    }); 

  },
  
  getContacts: function(cb){
    Contact.find({}, cb)
  },

  getUsers: function(cb){
    User.find({}, cb)
  },

  getContactsForUser: function(userId, cb){
    Contact.find({userId: userId}, cb);
  },

  searchContactsByTag: function(userId, tag, cb){
    Contact.find({userId: userId, tags: tag}, cb);
  },

  searchContactsByStatus: function(userId, status, cb){
    Contact.find({userId: userId, status: status}, cb);
  },


  createContact: function(contact, cb){
    Contact.create(contact, cb);
  },

  createContactFromInfo: function(userId, contactInfo, cb){
    var newContact = {
      userId: userId,
      contactInfo: contactInfo
    }
  },

  createUser: function(user, cb){
    User.create(user, cb)
  },

  updateContact: function(contact, cb){
    Contact.update({id: contact._id}, contact, cb);
  },

  updateUser: function(user, cb){
    User.update({id: user._id}, contact, cb);
  },

  // disconnect from database
  closeDB: function() {
    mongoose.disconnect();
  },
}