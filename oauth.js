var LinkedInSecret = 'whFh0tWuprvXxQVH',
LinkedInAPIKey = '77pzsbiqnoxgsn',
LinkedInCallback = 'http://localhost:3000/auth',
LinkedInUserToken = 'bf4cedd2-f26b-4f50-b193-f9f6800dc6ca',
LinkedInUserSecret = '5358d2c2-84cd-4394-930e-3e44cd21448e';


var _ = require('underscore');


var OAuth = require('OAuth');

module.exports = function(response){
 //  var OAuth2 = OAuth.OAuth2;    
 // var oauth2 = new OAuth2(
 //   LinkedInAPIKey,
 //   LinkedInSecret,
 //   'https://api.twitter.com/', 
 //   null,
 //   'oauth2/token', 
 //   null);
 // oauth2.getOAuthAccessToken(
 //   '',
 //   {'grant_type':'client_credentials'},
 //   function (e, access_token, refresh_token, results){
 //     console.log('bearer: ',access_token);
 //     oauth2.get('protected url', 
 //       access_token, function(e,data,res) {
 //         if (e) console.log(e);
 //         if (res.statusCode!=200) 
 //           return callback(new Error(
 //             'OAuth2 request failed: '+
 //             res.statusCode),null);
 //         try {
 //           data = JSON.parse(data);        
 //         }
 //         catch (e){
 //           return callback(e, null);
 //         }
 //         return callback(e, data);
 //      });
 //   });

  var oauth = new OAuth.OAuth(
      'https://api.linkedin.com/uas/oauth/requestToken',
      'https://api.linkedin.com/uas/oauth/accessToken',
      LinkedInAPIKey,
      LinkedInSecret,
      '1.0',
      'http://localhost:3000/auth',
      'HMAC-SHA1'
    );
    oauth.get(
      'http://api.linkedin.com/v1/people/6s9SlVwv7k:(id,first-name,last-name,email-address,industry,headline,phone-numbers,picture-url)?format=json',
      LinkedInUserToken , //test user token
      LinkedInUserSecret, //test user secret            
      function (e, data, res){
        if (e) console.error(e);  
        if(response) response.json(JSON.parse(data))
        console.log(data)
        // _.each(JSON.parse(data).values, function(d){
        //   console.log(d)
        //   oauth.get(
        //     email-address 6s9SlVwv7k
        //     'http://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,industry,headline, phone-numbers,picture-url)?format=json'
        //       d.siteStandardProfileRequest.url,
        //       LinkedInUserToken , //test user token
        //       LinkedInUserSecret, //test user secret            
        //       function (e, data, res){
        //         if (e) console.error(e); 
        //         console.log(data)
        //       })
        // })     
       //console.log(data);
      }); 
}
