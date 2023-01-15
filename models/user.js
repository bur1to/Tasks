const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const userSchema = mongoose.Schema({
  firstName: { type: String, minLength: 2, maxLength: 20 },
  lastName: { type: String, minLength: 2, maxLength: 20 },
  email: { type: String, unique: true },
  password: { type: String, minLength: 5 },
  salt: { type: String },
  age: { type: Number, minLength: 1, maxLength: 120 }
}, {
  collection: 'user',
  versionKey: false
});

const User = mongoose.model('User', userSchema);
module.exports = User;
