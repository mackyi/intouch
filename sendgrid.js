
var KEY = 'qwakcieimcoq',
	SECRET = 'ht1n1eppsz7j1w28srfunizr0vr2e4yk';

var sendgrid  = require('sendgrid')("mackyi", '1234abcd');


module.exports = {
	sendEmail: function(to, from, subject, text, cb){
		sendgrid.send({
		  to:       'example@example.com',
		  from:     'other@example.com',
		  subject:  'Hello World',
		  text:     'My first email through SendGrid.'
		}, cb);
	}
}
