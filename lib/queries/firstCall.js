module.exports = {
  get : get
};

function get(filters, body, tools) {
  // - Set the behavior of the filters with your query
  // - "?" is replaceb by value on body
  // - types: 'integer', 'string', 'stringLike', 'boolean', you can add more in tools/tools.js
  // - name of the filter, you can getByParam, just adding in the controller, inside
  //   funtion getFilters(), just add custom Params inside filters object
  var equivalences = {
    'id'    : {
      'condition' : 'id = ?',
      'type'      : 'integer'
    }
  };
  // You can add an array of querys [query1, query2], and there are executed one by one
  // query must be a string or an array of strings
  var query = 'SELECT id, value, slug '+
              'FROM firstCallTable '+
              tools.parseFilters(filters, equivalences, false)+';';
  return query;
}
