'use strict';

const {MongoClient} = require('mongodb');
const config = require('./config');
let db;

module.exports = function () {
	return new Promise(function (resolve, reject) {
		if (db) {
			resolve(db);
		} else {
			MongoClient.connect(config.mongodb, (err, database) => {
				if (err) {
					reject(err);
				}
				db = database;
				resolve(db);
			});
		}
	});
};
