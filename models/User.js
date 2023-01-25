const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: { type: String, required: true, maxLength: 20, minLength: 3 },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = model('User', UserSchema);
