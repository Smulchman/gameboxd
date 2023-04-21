const db = require('../config/connection');
const { Entry, User } = require('../models');

// Opens the database
db.once('open', async () => {
  // Deletes any previous entries
  await Entry.deleteMany({});
  // await User.deleteMany({});

  // Seeds in the data
  // const userData = await require('./userData.json');
  const entryData = await require('./entryData.json');

  // await User.insertMany(userData);
  await Entry.insertMany(entryData);

  console.log('all done!');
  process.exit(0);
});
