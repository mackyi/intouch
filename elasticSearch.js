ElasticSearchClient = require('elasticsearchclient');
_ = require('underscore')

var serverOptions = {
    host: 'localhost',
    port: 9200
};

var elasticSearchClient = new ElasticSearchClient(serverOptions);

var INDEX_NAME = 'contacts'
var TYPE = 'contact'
module.exports = {
	startup: function(){
		
	},

	cleanIndex: function(){
		elasticSearchClient.deleteIndex('contacts').exec()
		elasticSearchClient.createIndex('contacts').exec()
	},

	indexContact: function(contact){
		id = contact._id
		console.log(id)
		elasticSearchClient.index(INDEX_NAME, TYPE, contact, id.toString())
	    .on('data', function(data) {
	        console.log(data)
	    })
	    .exec()
	},

	searchContacts: function(userId, term, cb){
		qryObj= {
			query: {
				filtered: {
					query: {
						flt: {
							//fields: ['contactLog.text', 'tags', 'notes', 'contactInfo.firstName', 'contactInfo.lastName', 'contactInfo.emails'],
							fields: ['contactLog.text', 'tags', 'notes', 'firstName', 'lastName', 'email'],
							like_text: term
						}
	                },
	                filter: {
	                	term: {userId: userId}
	                }
				}
			}
        }

		elasticSearchClient.search(INDEX_NAME, TYPE, qryObj)
	    .on('data', function(data) {
	        console.log(JSON.parse(data))
	        cb(_.map(JSON.parse(data).hits.hits, function(d){
	        	return d._source;
	        }))
	    })
	    .on('done', function(){
	        //always returns 0 right now
	    })
	    .on('error', function(error){
	        console.log(error)
	    })
	    .exec()
	}
}