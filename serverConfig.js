// I recomend you to add this file to .gitignore

module.exports = {
	get : get
};

function get() {
	return {
		connectionLimit : 100,
		host     : 'localhost',
		database : 'myDB',
		user     : 'myDBUser',
		password : 'myPassword',
		debug    : false
	};
}
