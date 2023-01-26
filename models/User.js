const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  name: { type: String, required: true, maxLength: 20, minLength: 3 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash passwords before saving them
UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, parseInt(process.env.SALT));
  user.password = hash;
  return next();
});

// Create method for comparing passwords
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

module.exports = model('User', UserSchema);
