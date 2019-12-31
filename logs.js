'use strict';

const Debug = require('debug');
const Collection = require('./db');
const moment = require('moment');

const debug = Debug('app:db-rss');

class LogsCollection extends Collection {
	constructor() {
		super('logs');
	}

	async addLogUpdate(address, {lastCheck}) {
		const collection = await this.Collection;

		return collection.updateOne(
			{address},
			{$set: {address, lastCheck}},
			{upsert: true}
		);
	}

	async loadLogUpdateDates() {
		const collection = await this.Collection;

		const updateDates = await collection.find().toArray();
		return updateDates.reduce((dates, {address, lastCheck}) => {
			dates[address] = {
				lastCheck: moment(lastCheck || 0),
			};
			return dates;
		}, {});
	}

	async loadAllData() {
		const collection = await this.Collection;

		return collection.find().toArray();
	}
}

module.exports = new LogsCollection();
