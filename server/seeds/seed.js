const db = require('../config/connection');
const { Entry, User } = require('../models');

db.once('open', async () => {
const userData = require('./userData.json');
const entryData = require('./entryData.json');

User.insertMany(userData);
Entry.insertMany(entryData);

console.log('all done!');
process.exit(0);
});