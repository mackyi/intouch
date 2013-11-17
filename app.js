var express = require('express'),
  mongodb = require('mongodb'),
  mongoose = require('mongoose'),

db = require('./accessDB')

var app = express();
db.startup(require('./configure'));
require('./elasticSearch').cleanIndex();
require('./initDB')()

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "abcd"}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static('public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

require('./routes')(app);

var port = (process.env.port || 3000);

app.listen(port, function() {
  console.log("Listening on " + port);
});

//require('./oauth')()