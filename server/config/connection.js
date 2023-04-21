const mongoose = require('mongoose');
require('dotenv').config();

if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
mongoose.connect('mongodb://127.0.0.1:27017/gameboxd');
}
module.exports = mongoose.connection;
