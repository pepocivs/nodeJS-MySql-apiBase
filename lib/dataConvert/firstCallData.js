var i18n = require('i18n');

module.exports = {
  format : format
};

function format(callData) {
  var finalData = [];
  callData.forEach(function(data) {
    //Just if you want to parse some fields of give some special treathment to the object
    data.slug = i18n.__(data.slug);
    finalData.push(data);
  });
  return finalData;
}
