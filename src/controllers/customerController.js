const customerSchema = require('../models/customerSchema');

/**
 * Add a new Customer to the Customer schema
 * @param {*} req 
 * @param {*} res 
 */
async function addCustomer(req, res) {
  try {
    // Extract customer data from the request body
    const { customer_email, customer_name, customer_address, birthdate, password } = req.body;
    
    // Check if customer with the same email already exists
    const existingCustomer = await customerSchema.findOne({ customer_email });
    if (existingCustomer) {
      res.status(409).json({ message: "Customer with this email already exists" });
      return;
    }

    // Create a new customer instance
    const customer = new customerSchema({
      customer_email,
      customer_name,
      customer_address,
      birthdate,
      password
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
    // Extract customer id from the request parameters
    const { id } = req.params;
    
    // Extract updated customer data from the request body
    const { customer_email, customer_name, customer_address, birthdate, password } = req.body;

    // Create an object with the updated fields
    const updatedFields = {};
    if (customer_email) updatedFields.customer_email = customer_email;
    if (customer_name) updatedFields.customer_name = customer_name;
    if (customer_address) updatedFields.customer_address = customer_address;
    if (birthdate) updatedFields.birthdate = birthdate;
    if (password) updatedFields.password = password;

    // Find and update the customer by id with the updated fields
    const updatedCustomer = await customerSchema.findByIdAndUpdate(id, updatedFields, { new: true });

    // Check if customer exists
    if (!updatedCustomer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get Customer by its id
 * @param {*} req 
 * @param {*} res 
 */
async function getCustomerById(req, res) {
  try {
    const { id } = req.params;
    const customer = await customerSchema.findById(id);
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addCustomer,
  updateCustomer,
  getCustomerById
};
