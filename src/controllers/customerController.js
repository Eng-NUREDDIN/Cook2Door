/**
 * uncomment this after schema designed compeletly 
 * and pulled intpo the repository and delete this comment
 */
// const customerSchema = require('../models/customerSchema')

/**
 * This return all Customers 
 * @param {*} req 
 * @param {*} res 
 */
async function getAllCustomers (req, res) {

    //implemant the code here

}

/**
 * Add new Customer into the Customer schema
 * @param {*} req 
 * @param {*} res 
 */
async function addCustomer (req, res) {

    //implemant the code here

}

/**
 * Get Customer by its id
 * @param {*} req 
 * @param {*} res 
 */
async function getCustomerById (req, res) {

    //implemant the code here

}

/**
 * remove the Customer based on the id
 * @param {*} req 
 * @param {*} res 
 */
async function removeCustomer (req, res) {

    //implemant the code here

}

/**
 * Update the Customer based on its id
 * @param {*} req 
 * @param {*} res 
 */
async function updateCustomer (req, res) {

    //implemant the code here
    
}

module.exports = { getAllCustomers: getAllCustomers, 
    addCustomer: addCustomer, 
    getCustomerById: getCustomerById, 
    removeCustomer: removeCustomer, 
    updateCustomer: updateCustomer
}