var _        = require('lodash'),
    crypto   = require('crypto'),
    http     = require('http'),
    path     = require('path'),
    express  = require('express'),
    url      = require('url'),

    pages    = require('./page.js'),
    quest    = require('./quest.js'),

    app      = express(),

    /** const */
    AUTH_KEY = '1408';

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

var restLevelHandler = function(req, res) {

    var queryParams = url.parse(req.url, true).query,
        level = quest.getLevel(req.params.id, queryParams.key);

    if (level && queryParams.auth === AUTH_KEY) {
        res.json(level);
    } else {
        res.send('403: Forbidden', 403);

    }
}

var restPageHandler = function(req, res) {

    var page = pages.getPage(req.params.id);

    if (page) {
        res.json(page);
    } else {
        res.send('404: Not found', 404);
    }
}

var restAuthHandler = function(req, res) {
    res.json({
        key: '',
        keyHash: crypto.createHash('sha256').update(AUTH_KEY).digest('hex') // SHA256 hash of AUTH_KEY
    });
}

// User interface ages
var routes = [ '', 'intro/:id', 'let-me-in', 'level/:id' , 'success' ];
routes.forEach(function(route) {
    app.get('/' + route, routeHandler);
});

// REST api
app.get('/rest/page/:id',  restPageHandler);
app.get('/rest/auth',      restAuthHandler);
app.get('/rest/level/:id', restLevelHandler);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});