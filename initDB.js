var mongoose = require('mongoose'),
	Contact = require('./models/contact').Contact,
    User    = require('./models/user').User,
    StatusType= require('./models/contact').StatusType,
    elasticSearch = require('./elasticSearch')

module.exports = function(){
	console.log("hi");
	mongoose.connection.collections['users'].drop( function(err) {
	    console.log('users dropped');
	    mongoose.connection.collections['contacts'].drop( function(err) {
		    console.log('contacts dropped');
		    createSampleData()
		});
	});

	var createSampleData = function(){
		var sampleContactInfo = {
		  firstName: 'Bob',
		  lastName: 'Bobson',
		  phoneNumbers: ['1-919-123-456', '1-911-911-9111'],
		  emails: ['bobbobson@bob.com', 'bb@gmail.com'],
		}


		var sampleUser = {
		  _id: mongoose.Types.ObjectId("111111111111"),
		  username: "hackduke",
		  password: "test",
		  contactInfo: sampleContactInfo,
		  location: [70, 69.99]
		}
		
		for(var i=0; i<10; i++){
			var sampleUser2 = {
				username: "nearby"+i,
				password: "abc",
				contactInfo: sampleContactInfo,
				location: [i*10, i*10]
			}
			User.create(sampleUser2, function(err, user){
				if(err) console.log("error saving sample user!" + err);
			  	console.log('saved sample user' + JSON.stringify(user));
			})
		}



		User.create(sampleUser, function(err, user){
		  if(err) console.log("error saving sample user!" + err);
		  console.log('saved sample user' + JSON.stringify(user));

		  var generateContactInfo = function(num){
		  	return {
		  		 firstName: 'John'+num,
				 lastName: 'Johnson'+num,
				 phoneNumbers: ['1-919-123-456', '1-911-911-9111'],
				 emails: ['jjjjj@bob.com', 'bjj@gmail.com'],
		  	}
		  }

		  var sampleContact = {
		    userId: user._id,
		    contactInfo: generateContactInfo("Son"),
	        tags: ["hackduke", "awesome"],
			notes: "is an okay guy",
			status: StatusType.INBOX
		  }

		  Contact.create(sampleContact, function(err, contact){
		    if(err) console.log("error saving sample contact!" + err);
		    console.log('saved sample contact' + JSON.stringify(sampleContact));
		    elasticSearch.indexContact(contact);
		  })

		  var sampleContact2 = {
		    userId: user._id,
		    contactInfo: generateContactInfo("Son"),
	        tags: ["sucks", "lame"],
			notes: "never talk to this guy again",
			status: StatusType.LATER
		  }

		  Contact.create(sampleContact2, function(err, contact){
		    if(err) console.log("error saving sample contact!" + err);
		    console.log('saved sample contact' + JSON.stringify(sampleContact));
		    elasticSearch.indexContact(contact);
		  })
		})
	}
}
