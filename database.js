var sqlite3 = require('sqlite3').verbose()

module.exports = class dbHelper {
	constructor() {

		this.returnValue = 0;
		
		this.db = new sqlite3.Database(':memory', (err) => {
			if (err) {
				return console.error(err.message);
			}

			console.log('Connected to the in-memory SQlite database.');
		});
	};

	close_db() {

		this.db.close((err) => {
			if (err) {
				return  console.error(err.message);
			}
			console.log('Close the database connection.');
		});

	};
};
