var COINBASE_ID = '820b5031b131c09a3984f66cda0a283f654657b06bc0c6f91d9440e3c52138f1',
	COINBASE_SECRET = '477db4416d5b55e65d090bdca34863516698bd4bb8b16b9c150d289874dd4024',
	COINBASE_CALLBACK = 'urn:ietf:wg:oauth:2.0:oob';

module.exports = {

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
