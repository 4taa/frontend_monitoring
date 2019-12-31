'use strict';

const mongodb = require('.mongo');

module.exports = class DbCollection {
	constructor(name) {
		this.name = name;
	}

	get Collection() {
		return mongodb()
			.then(db => db.collection(this.name));
	}
};
