/**
 * uncomment this after schema designed compeletly 
 * and pulled intpo the repository and delete this comment
 */
// const cookSchema = require('../models/cookSchema')

/**
 * This return all cooks 
 * @param {*} req 
 * @param {*} res 
 */
async function getAllCooks (req, res) {

    //implemant the code here

}

/**
 * Add new cook into the cook schema
 * @param {*} req 
 * @param {*} res 
 */
async function addCook (req, res) {

    //implemant the code here

}

/**
 * Get cook by its id
 * @param {*} req 
 * @param {*} res 
 */
async function getCookById (req, res) {

    //implemant the code here

}

/**
 * remove the cook based on the id
 * @param {*} req 
 * @param {*} res 
 */
async function removeCook (req, res) {

    //implemant the code here

}

/**
 * Update the cook based on its id
 * @param {*} req 
 * @param {*} res 
 */
async function updateCook (req, res) {

    //implemant the code here

}

module.exports = { getAllCooks: getAllCooks, 
    addCook: addCook, 
    getCookById: getCookById, 
    removeCook: removeCook,
    updateCook: updateCook
}