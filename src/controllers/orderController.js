/**
 * uncomment this after schema designed compeletly
 * and pulled intpo the repository and delete this comment
 */
const orderSchema = require('../models/orderSchema')
const axios = require('axios')



/**
 * This return all Orders
 * @param {*} req
 * @param {*} res
 */
async function getAllOrders (req, res) {

    //implemant the code here
    try {
       // Fetches all orders from the orderSchema using the find() method
        const orders = await orderSchema.find();
        res.status(201).json(orders);
      } catch (err) {
           // If an error occurs, sends a 400 (Bad Request) status with the error message
        res.status(400).json({ message: err.message });
      }
}

/**
 * Add new Order into the Order schema
 * @param {*} req
 * @param {*} res
 */
async function addOrder (req, res) {

    //implemant the code here
    const { dish_id, customer_id, order_description } = req.body;

  try {
    // Check if the customer exists
  
  const resCustomer = await axios.get(`http://localhost:3000/api/customer/${customer_id}`);
  const customer = resCustomer.data;

  // If custome is not found, handle the error
  if (!custome) {
      return res.status(404).json({ error: 'customer not found' });
  }

    // Check if the dish exists
    const resDish = await axios.get(`http://localhost:3000/api/dish/${dish_id}`);
    const dish = resDish.data;
     // If Dish is not found, handle the error
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
     // Creates a new order instance using the orderSchema and the provided request body
    const newOrder = new orderSchema({
      dish_id,
      customer_id,
      order_description,
    });
        // Saves the new order to the database using the save() method
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
     // If an error occurs, sends a 400 (Bad Request) status with the error message
    res.status(400).json({ message: err.message });
  }
}

/**
 * Get Order by its id
 * @param {*} req
 * @param {*} res
 */

async function getOrderById (req, res) {

    //implemant the code here
    const { id } = req.params;

    try {
        // Fetches an order from the orderSchema by its ID using the findById() method
      const order = await orderSchema.findById(id);
      if (!order) {
       // If the order is not found, sends a 404 (Not Found) status with an appropriate error message
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(201).json(order);
    } catch (err) {
       // If an error occurs, sends a 400 (Bad Request) status with the error message
      res.status(400).json({ message: err.message });
    }
}

/**
 * remove the Order based on the id
 * @param {*} req
 * @param {*} res
 */
async function removeOrder (req, res) {

    //implemant the code here
    const { id } = req.params;

    try {
        // Finds and removes an order from the orderSchema by its ID using the findByIdAndDelete() method
      const order = await orderSchema.findByIdAndDelete(id);
      if (!order) {
         // If the order is not found, sends a 404 (Not Found) status with an appropriate error message
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(201).json({ message: 'Order removed successfully' });
    } catch (err) {
      // If an error occurs, sends a 400 (Bad Request) status with the error message
      res.status(400).json({ message: err.message });
    }

}

/**
 * Update the Order based on its id
 * @param {*} req
 * @param {*} res
 */
async function updateOrder (req, res) {

    //implemant the code here
    const { id } = req.params;
    const { order_description } = req.body;
  
    try {
       // Finds an order by its ID and updates it with the provided order description using the findByIdAndUpdate() method
      const order = await orderSchema.findByIdAndUpdate(
        id,
        {  order_description },
        { new: true }
      );
      if (!order) {
            // If the order is not found, sends a 404 (Not Found) status with an appropriate error message
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(201).json(order);
    } catch (err) {
      // If an error occurs, sends a 400 (Bad Request) status with the error message
      res.status(400).json({ message: err.message });
    }
}

module.exports = {
  getAllOrders,
  addOrder,
  getOrderById,
  removeOrder,
  updateOrder,
};
