var db = require('./accessDB'),
	elasticSearch = require('./elasticSearch'),
	LinkedInSecret = 'whFh0tWuprvXxQVH',
  LinkedInAPIKey = '77pzsbiqnoxgsn',
  LinkedInCallback = 'http://localhost:3000/auth',
  LinkedInUserToken = 'bf4cedd2-f26b-4f50-b193-f9f6800dc6ca',
LinkedInUserSecret = '5358d2c2-84cd-4394-930e-3e44cd21448e',
  linkedin_client = require('linkedin-js')(LinkedInAPIKey, LinkedInSecret, 'http://localhost:3000/auth');


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
			res.json(contacts);
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

	a.delete('/api/contacts/:id', function(req, res){
		db.deleteContact(req.params.id, function(err, contact){
			res.json(contact);
		})
	})

	a.delete('/api/users/:id', function(req, res){
		db.deleteUser(req.params.id, function(err, user){
			res.json(user);
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
