var mongoose = require('mongoose'),
	Contact = require('./models/contact').Contact,
    User    = require('./models/user').User,
    StatusType= require('./models/contact').StatusType,
    elasticSearch = require('./elasticSearch')

module.exports = function(){
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

		var pics = [
			'http://s24.postimg.org/f363mfh41/bush.jpg',
			'http://s24.postimg.org/ymaovsfvl/bush2.jpg',
			'http://s24.postimg.org/w2f21osbl/carter.jpg',
			'http://s24.postimg.org/ngbsh3gbl/clinton.jpg',
			'http://s24.postimg.org/png150llt/jfk.jpg',
			'http://s24.postimg.org/p9ep5f1i9/johnson.jpg',
			'http://s24.postimg.org/yat8j0zfl/nixon.jpg',
			'http://s24.postimg.org/k5nfh7qe9/obama.jpg',
			'http://s24.postimg.org/ce6pinm8x/reagan.jpg',
			'http://s24.postimg.org/f363mfh41/bush.jpg'
		]

		var firstNames = [
			"George", 	
			"George H. W.",
			"Jimmy",
			"Billiam",
			"John",
			"LB",
			"Ricky",
			"Barry",
			"Ron"
		]

		var lastNames = [
			"Bush",
			"Bush",
			"Carter",
			"Clinton",
			"Kennedy",
			"J",
			"Nixon",
			"Obama",
			"Reagan"
		]

		var phoneNumbers = [
			'(811) 912-0906',
			'(855) 237-6304',
			'(855) 076-6319',
			'(844) 096-5334',
			'(844) 473-4707',
			'(899) 356-7510',
			'(833) 963-2726',
			'(822) 223-6589',
			'(899) 534-3323'
		]

		var emails = [
			'TheWorthlesshacker@gmail.com',
			'TheGrouchyhacker@gmail.com',
			'ThePurplehacker@gmail.com',
			'TheDazzlinghacker@gmail.com',
			'TheSorehacker@gmail.com',
			'TheLargehacker@gmail.com',
			'TheGapinghacker@gmail.com',
			'TheAwfulhacker@gmail.com',
			'TheRobusthacker@gmail.com'
		]


		var tags = [
			'Ill',
			'Many',
			'Deeply',
			'Luxuriant',
			'Present',
			'Tall',
			'Swanky',
			'Clear',
			'Tired',
			'Fluffy',
			'Blue-eyed',
			'Average',
			'Obscene',
			'Parched',
			'Ten',
			'Uninterested',
			'Important',
			'Wooden',
			'Late',
			'Scattered',
			'Materialistic',
			'Alluring'
		]

		var notes = [
			"The light at the end of the tunnel may be an oncoming dragon.",
			'You cannot successfully determine beforehand which side of the bread to butter.',

			"If you're happy, you're successful.",

			'Pro is to con as progress is to Congress.',
			'If you eat a live frog in the morning, nothing worse will happen to either of you for the rest of the day.',

			"If you understand what you're doing, you're not learning anything.",

			"I used to think I was indecisive, but now I'm not so sure.",

			"The universe does not have laws -- it has habits, and habits can be broken.",

			"I didn't know it was impossible when I did it."
		]

		var statuses = [StatusType.INBOX, StatusType.LATER, StatusType.ARCHIVE]
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

		  var generateContact = function(num){
		  	var rand = Math.floor(Math.random()*tags.length)
		  	var status = statuses[Math.floor(Math.random()*3)]
		  	return {
		  		userId: user._id,
		  		firstName: firstNames[num],
		  		lastName: lastNames[num],
		  		phoneNumber: phoneNumbers[num],
		  		email: emails[num],
		  		tags: [tags[rand], tags[(rand+4+i)%tags.length]],
		  		notes: notes[num],
		  		picUrl: pics[num],
		  		status: statuses[num%3]
		  	}
		  }
		  var sampleContact = {
		    userId: user._id,
		    contactInfo: generateContactInfo("Son"),
	        tags: ["hackduke", "awesome"],
			notes: "is an okay guy",
			status: StatusType.INBOX
		  }

		  for(var i =0; i<9; i++){
		  	var contact = generateContact(i);
		  	Contact.create(contact, function(err, contact){
			    if(err) console.log("error saving sample contact!" + err);
			    console.log('saved sample contact' + JSON.stringify(sampleContact));
			    elasticSearch.indexContact(contact);
			  })
		  }
		//   Contact.create(sampleContact, function(err, contact){
		//     if(err) console.log("error saving sample contact!" + err);
		//     console.log('saved sample contact' + JSON.stringify(sampleContact));
		//     elasticSearch.indexContact(contact);
		//   })

		//   var sampleContact2 = {
		//     userId: user._id,
		//     contactInfo: generateContactInfo("Son"),
	 //        tags: ["sucks", "lame"],
		// 	notes: "never talk to this guy again",
		// 	status: StatusType.LATER
		//   }

		//   Contact.create(sampleContact2, function(err, contact){
		//     if(err) console.log("error saving sample contact!" + err);
		//     console.log('saved sample contact' + JSON.stringify(sampleContact));
		//     elasticSearch.indexContact(contact);
		//   })
		// })
	})
	}
}
