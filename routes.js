var db = require('./accessDB'),
	elasticSearch = require('./elasticSearch'),
	LinkedInSecret = 'whFh0tWuprvXxQVH',
  LinkedInAPIKey = '77pzsbiqnoxgsn',
  LinkedInCallback = 'http://localhost:3000/auth',
  LinkedInUserToken = 'bf4cedd2-f26b-4f50-b193-f9f6800dc6ca',
LinkedInUserSecret = '5358d2c2-84cd-4394-930e-3e44cd21448e',
  linkedin_client = require('linkedin-js')(LinkedInAPIKey, LinkedInSecret, 'http://localhost:3000/auth'),
  restler = require('restler');
  SendGridAPI = require('./sendgrid');


module.exports = function(app){
	app.get('/', function(req, res) {
		obj = {
			name: 'test',
			date: new Date()
		}
		res.json(obj)
	})

	app.get('/api/contacts', function(req, res){
		db.getContacts(function(err, contacts){
			res.json({response: contacts});
		})
	})

	app.get('/api/users', function(req, res){
		db.getUsers(function(err, contacts){
			res.json(contacts);
		})
	})

	// create user
	app.post('/api/users', function(req, res){
		console.log(req.body);
		user = req.body.user
		db.createUser(user, function(err, user){
			if(err) console.log(err);
			res.json(user)
		})
	})

	app.post('/api/users/update', function(req, res){
		console.log(req,body);
		contact = req.body.user
		db.updateUser(user, function(err, user){
			if(err) console.log(err);
			res.json(user)
		})
	})


	//create contact
	app.post('/api/contacts', function(req, res){
		console.log(req.body);
		contact = req.body.contact
		// dbContact = {
		// 	userId: contact.userId,
		// 	contactInfo: {
		// 		firstName: contact.firstName,
		// 		lastName: contact.lastName,
		// 		company: contact.company,
		// 		phoneNumbers: [contact.phoneNumber],
		// 		emails: [contact.email]
		// 	},
		// 	tags: contact.tags.split(" "),
		// 	notes: contact.notes,
		// 	status: contact.status
		// }

		db.createContact(contact, function(err, contact){
			if(err) console.log(err);
			res.json(contact)
		})
	})

	app.post('/api/contacts/update', function(req, res){
		console.log(req,body);
		contact = req.body.contact
		db.updateContact(contact, function(err, contact){
			if(err) console.log(err);
			res.json(contact)
		})
	})

	app.get('/api/contacts/search', function(req, res){
		var term = req.query.term
		var userId = req.query.userId
		// console.log(tag);
		// console.log(userId);
		elasticSearch.searchContacts(userId, term, function(results){
			res.json(results);
		})
	})

	app.get('/api/contacts/search/tag', function(req, res){
		var tag = req.query.tag
		var userId = req.query.userId
		// console.log(tag);
		// console.log(userId);
		db.searchContactsByTag(userId, tag, function(err, contacts){
			res.json(contacts);
		})
	})

	app.get('/api/contacts/search/status', function(req, res){
		var status = req.query.status
		var userId = req.query.userId
		console.log(status);
		console.log(userId);
		db.searchContactsByStatus(userId, status, function(err, contacts){
			res.json(contacts);
		})
	})

	app.get('/api/users/near', function(req, res){
		var userId = req.query.userId;
		db.findUsersNear(userId, function(err, users, stats){
			if(err) console.log(err)
			console.log(stats)
			res.json(users);
		})
	})

	app.get('/api/sendmail', function(req, res){
		var to = req.query.to;
		var from = req.query.from;
		var subject = req.query.subject;
		var text = req.query.text;
		SendGridAPI.sendEmail(to, from, subject, text, function(err, data){
			if(err) console.log(err)
			console.log(data);
			res.json(data);
		})
	})
	app.delete('/api/contacts/:id', function(req, res){
		db.deleteContact(req.params.id, function(err, contact){
			res.json(contact);
		})
	})

	app.delete('/api/users/:id', function(req, res){
		db.deleteUser(req.params.id, function(err, user){
			res.json(user);
		})
	})

	app.get('/api/printContacts', function(req, res){
		var userId = req.query.userId
		db.getContacts(function(err, contacts){
			contact = contacts[0]
			restler.post('https://api.lob.com/v1/postcards', {
				username: 'test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc',
				data: {
					to: {
						name: contacts[0].firstName + " " +contacts[0].lastName,
						email: contacts[0].email
					},
					from: {
						name: 'Mack Yi',
						email: 'themackyi@gmail.com'
					},
					front: 'https://www.lob.com/postcardfront.pdf',
					back: 'https://www.lob.com/postcardback.pdf'
				}
			}).on('complete', function(data, response){
				console.log(data);
				console.log(response);
			})
		})
	
	})
	// app.get('/auth', function(req,res){
	// 	linkedin_client.getAccessToken(req, res, function (error, token) {
	// 	    // will enter here when coming back from linkedin
	// 	    if(error) console.log(error) 
	// 	    console.log(token)
	// 	    req.session.token = token;

	// 		console.log(req.session)
	// 		linkedin_client.apiCall('POST', '/people/~/shares',
	//     {
	//       token: {
	//         oauth_token_secret: req.session.token.oauth_token_secret
	//       , oauth_token: req.session.token.oauth_token
	//       }
	//     , share: {
	//         comment: 'hi'//req.param('message')
	//       , visibility: {code: 'anyone'}
	//       }
	//     }
	//   , function (error, result) {
	//   	  if(error) console.log(error)
	//       res.json({
	//       	status: "message sent"
	//       })
	//     }
	//   );
	// 	  });
	// })

	// app.get('/testLinkedIn', function(req, res){
	// 	require('./oauth')(res);
	// })
	// app.post('/message', function (req, res) {
	// 	console.log(req.session.token)
	//   linkedin_client.apiCall('POST', '/people/~/shares',
	//     {
	//       token: {
	//         oauth_token_secret: req.session.token.oauth_token_secret
	//       , oauth_token: req.session.token.oauth_token
	//       }
	//     , share: {
	//         comment: 'hi'//req.param('message')
	//       , visibility: {code: 'anyone'}
	//       }
	//     }
	//   , function (error, result) {
	//   	  if(error) console.log(error)
	//       res.json({
	//       	status: "message sent"
	//       })
	//     }
	//   );
	// });
}
