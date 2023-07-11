const customerSchema = require('../models/customerSchema');

/**
 * This returns all Customers
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
    const { customer_email, customer_name, customer_address, birthdate, provider, provider_id } = req.body;
    
    // Create a new customer instance
    const customer = new customerSchema({
      customer_email,
      customer_name,
      customer_address,
      birthdate,
      provider,
      provider_id
    });

    // Save the customer to the database
    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get a Customer by its id
 * @param {*} req 
 * @param {*} res 
 */
async function getCustomerById(req, res) {
  try {
    // Extract customer id from the request parameters
    const { id } = req.params;
    
    // Find the customer by id
    const customer = await customerSchema.findById(id);
    
    // Check if customer exists
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Remove the Customer based on the id
 * @param {*} req 
 * @param {*} res 
 */
async function removeCustomer(req, res) {
  try {
    // Extract customer id from the request parameters
    const { id } = req.params;
    
    // Find and remove the customer by id
    const removedCustomer = await customerSchema.findByIdAndRemove(id);
    
    // Check if customer exists
    if (!removedCustomer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    
    res.status(200).json({ message: "Customer removed successfully" });
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
    const { customer_email, customer_name, customer_address, birthdate, provider, provider_id } = req.body;
    
    // Find and update the customer by id
    const updatedCustomer = await customerSchema.findByIdAndUpdate(
      id,
      {
        customer_email,
        customer_name,
        customer_address,
        birthdate,
        provider,
        provider_id
      },
      { new: true }
    );
    
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

module.exports = {
  getAllCustomers,
  addCustomer,
  getCustomerById,
  removeCustomer,
  updateCustomer
};
