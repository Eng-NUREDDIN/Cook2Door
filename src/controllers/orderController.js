const orderSchema = require('../models/orderSchema');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const axios = require('axios');


/**
 * This return all Orders
 * @param {*} req
 * @param {*} res
 */
async function getAllOrders(req, res) {
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
async function addOrder(req, res) {
  if (req.user.role !== 'CUSTOMER') {
    return res.status(403).json({ error: 'Forbidden - Access denied' });
  }
  
  const { cook_id, dish_id, customer_id, order_description } = req.body;
  
  
  // For invalid Id
  if (!ObjectId.isValid(cook_id)) {
    res.status(400).json({ message: 'Invalid cook ID' });
    return;
  }
  // For invalid Id
  if (!ObjectId.isValid(dish_id)) {
    res.status(400).json({ message: 'Invalid dish ID' });
    return;
  }
  // For invalid Id
  if (!ObjectId.isValid(customer_id)) {
    res.status(400).json({ message: 'Invalid customer ID' });
    return;
  }

  
    // Check if the customer exists
try{

    const resCustomer = await axios.get(
      `http://localhost:3000/api/customer/${customer_id}`
    );
    
    // Customer Data in respond of API
    const customer = resCustomer.data;
  
    // If custome is not found, handle the error
    if (!customer) {
        return res.status(404).json({ error: 'customer not found' });
    }
  }
  catch(err){
    if (err.response.status == 404)
      return res.status(404).json({ error: 'customer not found' });
    }

  try {
    // Check if the dish exists
    const resDish = await axios.get(
      `http://localhost:3000/api/dish/${dish_id}`
    );

    // Dish Data in respond of API
    const dish = resDish.data;

    // If Dish is not found, handle the error
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    // Check if the dish exists
    const resCook = await axios.get(
      `http://localhost:3000/api/cook/${cook_id}`
    );

    // Dish Data in respond of API
    const cook = resCook.data;

    // If Dish is not found, handle the error
    if (!cook) {
      return res.status(404).json({ message: 'Cook not found' });
    }

    // Creates a new order instance using the orderSchema and the provided request body
    const newOrder = new orderSchema({
      cook_id,
      dish_id,
      customer_id,
      order_description,
    });

    // Saves the new order to the database using the save() method
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    // console.log(err)
     // If an error occurs, sends a 400 (Bad Request) status with the error message
     res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Get Order by its id
 * @param {*} req
 * @param {*} res
 */

async function getOrderByOrderId(req, res) {
  
  const { orderId } = req.params;

  // For invalid Id
  if (!ObjectId.isValid(orderId)) {
    res.status(400).json({ message: 'Invalid order ID' });
    return;
  }

  try {
    // Fetches an order from the orderSchema by its ID using the findById() method
    const order = await orderSchema.findById(orderId);
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
 * return all orders which has same customerId
 * @param {*} req 
 * @param {*} res 
 */
async function getAllOrdersByCustomerId( req, res ){
  if (req.user.role !== 'COOK' || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden - Access denied' });
  }

  const {customerId} = req.params

  // For invalid Id
  if (!ObjectId.isValid(customerId)) {
    res.status(400).json({ message: 'Invalid customer ID' });
    return;
  }

  try{
    // Fetches orders from the orderSchema by their customerId using the find() method
    const order = await orderSchema.find({customer_id: customerId})
    if ( !order ){
      // If the order is not found, sends a 404 (Not Found) status with an appropriate error message
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(201).json(order);

  } catch( err ){
    res.status(400).json({message: err.message})
  }
}

/**
 * return all orders which have same cookId
 * @param {*} res 
 * @param {*} req 
 */
async function getAllOrdersByCookId( req, res ){

  if (req.user.role !== 'COOK' || req.user.role !== 'ADMIN') {  
    return res.status(403).json({ error: 'Forbidden - Access denied' });
  }
  const {cookId}= req.params

  // For invalid Id
  if (!ObjectId.isValid(cookId)) {
    res.status(400).json({ message: 'Invalid cook ID' });
    return;
  }

  try{
    // Fetches orders from the orderSchema by their cookId using the find() method
    const order = await orderSchema.find({cook_id: cookId})
    if ( !order ){
      // If the order is not found, sends a 404 (Not Found) status with an appropriate error message
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(201).json(order);

  }catch (err) {
    res.status(400).json({message: err.message})
  }
}

/**
 * remove the Order based on the id
 * @param {*} req
 * @param {*} res
 */

async function removeOrder(req, res) {
  //implemant the code here
  const { orderId } = req.params;

  // For invalid Id
  if (!ObjectId.isValid(orderId)) {
    res.status(400).json({ message: 'Invalid order ID' });
    return;
  }

  try {
    // Finds and removes an order from the orderSchema by its ID using the findByIdAndDelete() method
    const order = await orderSchema.findByIdAndDelete(orderId);
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

async function updateOrderByOrderId(req, res) {
  if (req.user.role !== 'CUSTOMER') {
    return res.status(403).json({ error: 'Forbidden - Access denied' });
  }
  //implemant the code here
  const { orderId } = req.params;
  const { order_description, order_state } = req.body;

  // For invalid Id
  if (!ObjectId.isValid(orderId)) {
    res.status(400).json({ message: 'Invalid order ID' });
    return;
  }

  try {
    // Finds an order by its ID and updates it with the provided order description using the findByIdAndUpdate() method
    const order = await orderSchema.findByIdAndUpdate(
      orderId,
      { order_description, order_state, updated_at: Date.now() },
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

/**
 * update order description from customer
 * @param {*} req 
 * @param {*} res 
 */
async function updateOrderByCustomerId(req, res) {
  if (req.user.role !== 'COOK' || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden - Access denied' });
  }
  //implemant the code here
  const { customerId, orderId } = req.params;
  const { order_description } = req.body;

  // For invalid Id
  if (!ObjectId.isValid(orderId)) {
    res.status(400).json({ message: 'Invalid order ID' });
    return;
  }
  // For invalid Id
  if (!ObjectId.isValid(customerId)) {
    res.status(400).json({ message: 'Invalid customer ID' });
    return;
  }

  try {
    // Finds an order by customerId and OrderId and 
    // updates it with the provided order description 
    const order = await orderSchema.findOneAndUpdate(
      {_id: orderId, customer_id: customerId},
      { order_description: order_description, updated_at: Date.now() },
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

async function updateOrderState(req, res) {
  if (req.user.role !== 'COOK' || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden - Access denied' });
  }
  //implemant the code here
  const { orderId, cookId } = req.params;
  const { orderState } = req.body;
  
    // For invalid Id
  if (!ObjectId.isValid(orderId)) {
    res.status(400).json({ message: 'Invalid order ID' });
    return;
  }
  // For invalid Id
  if (!ObjectId.isValid(cookId)) {
    res.status(400).json({ message: 'Invalid cook ID' });
    return;
  }

  try { 
    // Finds an order by its ID and updates it with the provided order description using the findByIdAndUpdate() method
    const order = await orderSchema.findOneAndUpdate(
      {_id: orderId, cook_id: cookId},
      { order_state: orderState, updated_at: Date.now() },
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
  getOrderByOrderId,
  getAllOrdersByCustomerId,
  getAllOrdersByCookId,
  removeOrder,
  updateOrderByOrderId,
  updateOrderByCustomerId,
  updateOrderState
};
