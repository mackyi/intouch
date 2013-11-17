// Module dependencies
var mongoose = require('mongoose'),
    Contact = require('./models/contact').Contact,
    User    = require('./models/user').User,

    EARTH_RADIUS_MILES = 3963.1676;
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
    Contact.update({_id: contact._id}, contact, cb);
  },

  updateUser: function(user, cb){
    User.update({_id: user._id}, contact, cb);
  },

  deleteContact: function(id, cb){
    Contact.remove({_id: id}, cb);
  },

  deleteUser: function(id, cb){
    User.remove({_id: id}, cb)
  },

  findUsersNear: function(id, cb){
    console.log(id)
    User.findOne({_id: id}, function(err, user){
      if(err) return cb(err);
      var point = { type : "Point", coordinates : user.location };
      User.geoNear(user.location, {spherical : true, 
        maxDistance: 1/EARTH_RADIUS_MILES}, cb);
    })

  },


  // disconnect from database
  closeDB: function() {
    mongoose.disconnect();
  },
}