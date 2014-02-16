var _        = require('lodash'),
    http     = require('http'),
    path     = require('path'),
    express  = require('express'),
    url      = require('url'),

    quest    = require('./quest.js'),

    app      = express();

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

var routeHandler = function(req, res) {
    res.render('index');
};

var restHandler = function(req, res) {

    var queryParams = url.parse(req.url, true).query,
        level = quest.getLevel(req.params.id, queryParams.key);

    if (level) {
        res.json(level);
    } else {
        res.send('403: Forbidden', 403);

    }
}

// User interface ages
var routes = [ '/', '/auth', '/level/:id' , '/success' ];
routes.forEach(function(route) {
    app.get(route, routeHandler);
});

// REST api
app.get('/rest/level/:id', restHandler);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});