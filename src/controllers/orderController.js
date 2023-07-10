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
    
}

/**
 * Add new Order into the Order schema
 * @param {*} req 
 * @param {*} res 
 */
async function addOrder (req, res) {

    //implemant the code here

}

/**
 * Get Order by its id
 * @param {*} req 
 * @param {*} res 
 */
async function getOrderById (req, res) {

    //implemant the code here

}

/**
 * remove the Order based on the id
 * @param {*} req 
 * @param {*} res 
 */
async function removeOrder (req, res) {

    //implemant the code here

}

/**
 * Update the Order based on its id
 * @param {*} req 
 * @param {*} res 
 */
async function updateOrder (req, res) {

    //implemant the code here
    
}

module.exports = { getAllOrders: getAllOrders, addOrder: addOrder, getOrderById: getOrderById, removeOrder: removeOrder,
    updateOrder: updateOrder
}