var http = require('http');
var path = require('path');
var express = require('express');

var app = express();


app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));

app.use(express.urlencoded());
app.use(express.json());

app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));

app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
    res.render('index', {
        title: "EJS example",
        header: "Some users"
    });
});


//app.get('/auth/twitter', routes.authTwitter);
//app.get('/auth/twitter/callback', routes.authTwitterCallback);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
