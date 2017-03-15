var myDBDao = require('../../lib/dao/myDB/myDBDao.js');
var _       = require('lodash');
var i18n    = require('i18n');

// 2 - Add daoCall and go to dao

module.exports = {
  getFirstCall: _.partial(callDao, 'getFirstCall', 'firstCallData')
};

function callDao(daoFunction, dataParser, req, res) {
  i18n.setLocale(req.headers['accept-language'] || 'en_US');
  var db         = req.db;
  var configData = { 'body': req.body };
  var filters    = getFilters(req);

  myDBDao[daoFunction](db, configData, filters, function(err, data) {
    if (!hasError(res, err))
      sendData(res, data, dataParser);
  });
}

function sendData(res, data, conversor) {
  var finalData = require('../../lib/dataConvert/'+conversor+'.js').format(data);
  if (!finalData) res.status(400).send({'Error' : true, 'Message' : 'Problem connecting to database'});
  else            res.status(200).send(finalData);
}

function hasError(res, err) {
  if (err) res.status(400).send({
    'Error' : true,
    'Message' : err
  });
  return err;
}

function getFilters(req) {
  var filters = req.query || {};
  Object.keys(req.params).forEach(function(key) {
    filters[key] = req.params[key];
  });
  return filters;
}
