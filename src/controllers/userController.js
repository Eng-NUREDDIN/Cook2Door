const userSchema = require('../models/userSchema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/**
 * Return all users
 * @param {*} res
 * @param {*} req
 */
async function getAllUsers(req, res) {
  try {
    const users = await userSchema.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

/**
 * Sig UP the user
 * @param {*} req
 * @param {*} res
 */
async function signUp(req, res) {
  try {
    const { email, password, role } = req.body;    
    // Check for null or undefined values
    if (
      email === null ||
      email === undefined ||
      password === null ||
      password === undefined
    ) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // Check for empty values (for strings)
    if (email.trim() === '' || password.trim() === '') {
      res.status(400).json({ error: 'Email and password cannot be empty' });
      return;
    }

    // check for the role value
    if (role === null || role === undefined || role.trim() === '') {
      res.status(400).json({ error: 'Role is required' });
      return;
    }
    const newUser = new userSchema({ email, password, role });
    await newUser.save();
    // Create and sign the JWT token
    const token = jwt.sign({ userId: newUser._id, email: newUser.email, role: newUser.role }, process.env.SECRET_KEY);
    res.status(200).json({ token, userId: newUser._id, email: newUser.email, role: newUser.role });
  } catch (error) {
    res.status(500).json({ error: error, message: req.body });
  }
}

/**
 * SignIn the User
 * @param {*} req
 * @param {*} res
 */
async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    // Check for null or undefined values in email and password
    if (
      email === null ||
      email === undefined ||
      password === null ||
      password === undefined
    ) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

// Check for empty values (for strings) in email and password
if (email.trim() === '' || password.trim() === '') {
  res.status(400).json({ error: 'Email and password cannot be empty' });
  return;
}
;
    const user = await userSchema.findOne({ email: email});

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.SECRET_KEY);    
    user.token = token;      
    res.status(200).json({ token, userId: user._id, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

/**
 * Update the User
 * @param {*} req
 * @param {*} res
 */
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updatedUser = req.body;
    // Check for null or undefined values in email, password, and role
    if (
      updatedUser.email === null ||
      updatedUser.email === undefined ||
      updatedUser.password === null ||
      updatedUser.password === undefined
    ) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // Check for empty values (for strings) in email, password, and role
    if (
      updatedUser.email.trim() === '' ||
      updatedUser.password.trim() === '' ||
      (updatedUser.role !== undefined && updatedUser.role.trim() === '')
    ) {
      res
        .status(400)
        .json({ error: 'Email, password, and role cannot be empty' });
      return;
    }

    // check for the role value
    if (
      updatedUser.role === null ||
      updatedUser.role === undefined ||
      updatedUser.role.trim() === ''
    ) {
      res.status(400).json({ error: 'Role is required' });
      return;
    }
    await userSchema.findByIdAndUpdate(id, updatedUser);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

/**
 * Remove the user
 * @param {*} req
 * @param {*} res
 */
async function removeUser(req, res) {
  try {
    const { id } = req.params;
    await userSchema.findByIdAndRemove(id);
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  getAllUsers,
  signIn,
  signUp,
  updateUser,
  removeUser,
};
