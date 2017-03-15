var express     = require('express');
var mysql       = require('mysql');
var morgan      = require('morgan');
var i18n        = require('i18n');
var bodyParser  = require('body-parser');
var routes      = require('./routes.js');
var connData    = require('./serverConfig.js');
var app         = express();
var fs          = require('fs');
var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));


module.exports = {
  connectMysql     : connectMysql,
  configureExpress : configureExpress,
  startServer      : startServer,
  stopServer       : stopServer
};

function connectMysql() {
  var pool = mysql.createPool(connData.get());
  pool.getConnection(function(err, db) {
    if (err) {
      stopServer(err);
    } else {
      return configureExpress(db);
    }
  });
}

function configureExpress(db) {
  var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Access-Token, Cache-Control, Pragma, Accept-Language');
    next();
  };

  app.use(allowCrossDomain);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  i18n.configure({
    defaultLocale: 'en_US',
    fallbacks:{'es': 'es_ES', 'en': 'en_US'},
    locales:['en_US', 'es_ES'],
    directory: __dirname + '/locale'
  });
  app.use(i18n.init);

  app.use(function addDbToRequest(req, res, next) {
    req.db = db;
    next();
  });

  var router = express.Router();
  app.use('/', router);
  new routes(router);
  startServer();
  return db;
}

function startServer() {
  var port = 4000;
  app.listen(port, function() {
    var date = new Date();
    console.info(packageJson.name+' apiRestFull v'+packageJson.version+' alive at Port '+port+'.\n'+date);
    console.info('--------------------------------------\n');
  });
}

function stopServer(err) {
  console.info('ISSUE WITH MYSQL \n' + err);
  process.exit(1);
}
