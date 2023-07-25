const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['COOK', 'CUSTOMER'],
  },
});

// Hash the email and password before saving the user data
userSchema.pre('save', async function (next) {
  const user = this;

  // Only hash the password and email if they have been modified (or are new)
  if (!user.isModified('password') && !user.isModified('email')) return next();

  try {
    // Generate a salt to add randomness to the hash
    const salt = await bcrypt.genSalt(10);

    // Hash the password and email with the salt
    if (user.isModified('password')) {
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
    }

    // if (user.isModified('email')) {
    //   const hashedEmail = await bcrypt.hash(user.email, salt);
    //   user.email = hashedEmail;
    // }

    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model('userSchema', userSchema);
