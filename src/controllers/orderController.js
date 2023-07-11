/**
 * uncomment this after schema designed compeletly 
 * and pulled intpo the repository and delete this comment
 */
// const orderSchema = require('../models/orderSchema')

/**
 * This return all Orders 
 * @param {*} req 
 * @param {*} res 
 */
async function getAllOrders (req, res) {

    //implemant the code here
    try {
        const orders = await OrderModel.find();
        res.json(orders);
      } catch (err) {
        res.status(500).json({ message: err.message });
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
    const newOrder = new OrderModel({
      dish_id,
      customer_id,
      order_description,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
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
      const order = await OrderModel.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.json(order);
    } catch (err) {
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
      const order = await OrderModel.findByIdAndDelete(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.json({ message: 'Order removed successfully' });
    } catch (err) {
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
  const { dish_id, customer_id, order_description } = req.body;

  try {
    const order = await OrderModel.findByIdAndUpdate(
      id,
      { dish_id, customer_id, order_description },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
    
    
}

module.exports = { getAllOrders: getAllOrders, addOrder: addOrder, getOrderById: getOrderById, removeOrder: removeOrder,
    updateOrder: updateOrder
}