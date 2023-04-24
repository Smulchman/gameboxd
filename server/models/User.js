const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema } = mongoose;


const wishlistItemSchema = new Schema({
  gameId: {
    type: Number,
    required: true,
  },
  // Add any other properties you want to save
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxLength: 20,
    // instead of using trim, I'm using this regex to prevent spaces altogether
    match: [/^\S+$/, 'Usernames may not contain spaces'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 25,
    match: [/.+@.+\..+/, 'Must match an email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  entries: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Entry',
    },
  ],
  wishlist: [wishlistItemSchema]
});




// pre-save middleware to create encrypted password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
