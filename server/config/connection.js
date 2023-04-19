const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017:27017/merndb');

module.exports = mongoose.connection;
