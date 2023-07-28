const customerSchema = require('../models/customerSchema');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const axios = require('axios');

/**
 * Get all Customers
 * @param {*} req
 * @param {*} res
 */
async function getAllCustomers(req, res) {
  try {
    const customers = await customerSchema.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Add a new Customer to the Customer schema
 * @param {*} req
 * @param {*} res
 */
async function addCustomer(req, res) {
  try {
    // Extract customer data from the request body
    const {
      customer_email,
      customer_name,
      customer_address,
      birthdate,
      password,
    } = req.body;

    // Check if customer with the same email already exists
    const existingCustomer = await customerSchema.findOne({ customer_email });
    if (existingCustomer) {
      res
        .status(409)
        .json({ message: 'Customer with this email already exists' });
      return;
    }

    // Encrypt the customer_name before saving to the database
    const encrypted_name = encryptName(customer_name, process.env.SECRET_KEY);

    // Convert to the Date
    const birthdateDate = new Date(birthdate);

    // Create a new customer instance
    const customer = new customerSchema({
      customer_email,
      encrypted_name, // Save the encrypted name to the database
      customer_address,
      birthdate: birthdateDate,
      password,
    });

    // Save the customer to the database
    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Update the Customer based on its id
 * @param {*} req
 * @param {*} res
 */
async function updateCustomer(req, res) {
  try {
    const { id } = req.params;
    const {
      customer_email,
      customer_name,
      customer_address,
      birthdate,
      password,
    } = req.body;

    // Create an object with the updated fields
    const updatedFields = {};
    if (customer_email) updatedFields.customer_email = customer_email;
    if (customer_address) updatedFields.customer_address = customer_address;
    if (birthdate) updatedFields.birthdate = birthdate;
    if (password) updatedFields.password = password;

    // Encrypt the customer_name before updating
    if (customer_name) {
      updatedFields.encrypted_name = encryptName(customer_name, process.env.SECRET_KEY);
    }

    // Find and update the customer by id with the updated fields
    const updatedCustomer = await customerSchema.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

    // Check if customer exists
    if (!updatedCustomer) {
      res.status(404).json({ message: 'Customer not found' });
      return;
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllCustomers, // Retrieves all customers from the database
  addCustomer, // Adds a new customer to the database
  getCustomerById, // Retrieves a customer by their ID
  removeCustomer, // Removes a customer from the database by their ID
  updateCustomer, // Updates a customer in the database by their ID
};


const crypto = require('crypto');

// Encrypt a name
function encryptName(name, secretKey) {
    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    let encrypted = cipher.update(name, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Decrypt an encrypted name
function decryptName(encryptedName, secretKey) {
    const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
    let decrypted = decipher.update(encryptedName, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encryptName, decryptName };
