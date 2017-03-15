module.exports = {
  parseFilters  : parseFilters
};

function parseFilters(filters, equivalences, alreadyWhere, type) {
  if (!Object.keys(filters).length) return '';
  else if (type !== 'paginate') {
    var where = (alreadyWhere) ? 'AND ' : 'WHERE ';
    var hasFilters = false;
    Object.keys(filters).forEach(function(filter) {
      if (equivalences[filter]) {
        hasFilters = true;
        where += '(';
        var filterValues = filters[filter].split(',');
        filterValues.forEach(function(filterValue) {
          var value = setQueryType(filterValue, equivalences[filter].type);
          where += '('+equivalences[filter].condition.split('?').join(value)+') OR ';
        });
        where = where.substring(0, where.length - 4);
        where += ') AND ';
      }
    });
    where = where.substring(0, where.length - 5);
    return (hasFilters) ? where : '';
  } else {
    filters.page = (filters.page) ? filters.page : 1;
    if (filters.registers && filters.page) return 'LIMIT '+((filters.page-1)*filters.registers)+','+filters.registers;
    else return '';
  }
}

function setQueryType(value, type) {
  if (type === 'integer')    return (typeof parseInt(value) == 'number' && parseInt(value) > 0) ? parseInt(value) : 0;
  if (type === 'string')     return '"'+value+'"';
  if (type === 'stringLike') return '"%'+value+'%"';
  if (type === 'boolean')    return (value == 'true') ? 1 : 0;
}
