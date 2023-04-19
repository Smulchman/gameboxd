const db = require('../config/connection');
const { Entry, User } = require('../models');

db.once('open', async () => {
  await Entry.deleteMany({});
  await User.deleteMany({});

  const userData = await require('./userData.json');
  const entryData = await require('./entryData.json');

  await User.insertMany(userData);
  await Entry.insertMany(entryData);

  console.log('all done!');
  process.exit(0);
});
