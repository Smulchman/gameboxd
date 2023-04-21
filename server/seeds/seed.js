const db = require('../config/connection');
const { Entry, User } = require('../models');

// Opens the database
db.once('open', async () => {
  // Deletes any previous entries
  await Entry.deleteMany({});
  await User.deleteMany({});

  // Stores the seed data in usable arrays
  const userData = await require('./userData.json');
  const entryData = await require('./entryData.json');

  // Creates the users
  await User.insertMany(userData);
  // Gets the ids of the users
  let getIdsArray = await User.find();
  let idsArray = getIdsArray.map((user) => user._id);
  // Assigns a random user to each entry in the array of entries before they're pushed to the database
  let newEntryData = entryData.map((entry) => {
    entry.user = idsArray[Math.floor(Math.random() * idsArray.length)];
    return entry;
  });

  // Creates the entries
  await Entry.insertMany(newEntryData);
  // Gets the ids of the entries
  let getEntriesArray = await Entry.find();
  // Pushes the ids of the entries to the users referenced in the entries
  for (const entry of getEntriesArray) {
    await User.findOneAndUpdate(
      { _id: entry.user },
      { $push: { entries: entry._id } }
    );
  }

  console.log('all done!');
  process.exit(0);
});
