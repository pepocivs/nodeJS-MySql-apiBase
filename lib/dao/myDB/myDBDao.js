var tools    = require('../../tools/tools.js');
var _        = require('lodash');

// 3 - Add geter for your call
// 4 - Create queries/newCall.js
// 5 - Create dataConvert/newCallData.js

module.exports = {
	getFirstCall:   _.partial(getInfo, 'get', 'firstCall')
};

function getInfo(type, where, db, configData, filters, callback) {
	var mysqlQuery = require('../../queries/'+where+'.js');
	var body       = configData.body;
	var query      = mysqlQuery[type](filters, body, tools);
	if (!query) return callback(new Error('undefined Call'));
	else if (_.isArray(query)) {
		var responseObject = [];
		var error = null;
		query.forEach(function(q, i) {
			db.query(q, function(err, res) {
					if (err) error = err;
					else responseObject.push(res);
					if (i === query.length-1) return callback(error, responseObject);
			});
		});
	} else {
		return db.query(query, callback);
	}
}
