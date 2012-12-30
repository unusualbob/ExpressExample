var express = require('express')
  , _ = require('underscore')
  , sys = require(process.binding('natives').util ? 'util' : 'sys');
  
var app = express();
var port = 80;

//Configuration///////////////////////////////
app.configure(function() {

  //optional
  //app.set('case sensitive routes', true);
  //app.set('strict routing', true);

  //This tells express that all static files can be found in /public
  //ie if someone requests something that isnt an endpoint it will be here
  app.use(express.static(__dirname + '/public'));
  
  //This tells express to use jade for templates
  app.set('view engine', 'jade');
    
  //This tells express that the templates are in a folder called 'views'
  app.set('views', __dirname + '/views');

  //A parser built into express to give us easy access to GET and POST parameters
  app.use(express.bodyParser());
  
  //Just tells express to use standard router
  app.use(app.router);
});

//These are some test credentials we'll use as an example later
var appCredentials = {
    username : 'test'
  , password : 'test'
};

//Endpoints///////////////////////////////

//Basic home endpoint, will render the 'home' template
app.get('/', function(req, res) {
  res.render('home');
});

//Requires httpAuth with the credentials shown earlier
app.get('/auth', function(req, res) {
  authenticate(req, res, function() {
    res.render('auth', {'headers': req.headers['authorization']});
  });
});

//JSON example response
app.get('/json', function(req, res) {
  res.send({'status': 'ok', 'message': 'This is a json example'});
});


//Post to this with a parameter 'data' and it will give it back.
app.post('/post', function(req, res) {
  
  if (req.param('data','') != '') {
    res.send({'status': 'ok', 'data': data});
  } else {
    res.send({'status': 'error', 'message': 'No data sent'});
  }
  
});

//THIS MUST BE THE LAST ROUTE!
app.use(function(req, res) {
  res.render('404.jade', { status: 404 });
});

//Announce the server is running in console :)
console.log("Server is now running");


//Utility Functions///////////////////////////////

function authenticate(req, res, next) {
  console.log(req.headers['authorization']);
  if (typeof(req.user) != 'undefined') {
    next(req, res, req.user, credentials);
  } else {
    var authorization = req.headers['authorization'];
    
    if (!authorization) {
      notAuthenticated(res);
    } else {
    
      var parts = authorization.split(' ');

      var scheme = parts[0];
      
      if (scheme === 'Basic') {
      
        var authBuffer = new Buffer(parts[1], 'base64').toString().split(':');
      
        var credentials = {
            username: authBuffer[0]
          , password: authBuffer[1]
        };
        
        if (appCredentials.username == credentials.username) {
          if (appCredentials.password == credentials.password) {
            next(req, res);
          } else {
            console.log('bad pass');
            notAuthenticated(res);
          }
        } else {
          console.log('bad user');
          notAuthenticated(res);
        }
        
      } else {
        console.log('scheme unhandled. was: ' + scheme);
      }
    }
  }

}

function notAuthenticated(res) {
  console.log('not authenticated');
  res.statusCode = 401;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('WWW-Authenticate', 'Basic realm="Authorization required."');
  res.end('{ status: "error", message: "This resource requires you to be authenticated." }');
}

//Bind the server to the port so we can actually hit it
app.listen(port);