const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const { validCustomer } = require('../validation/validator');

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: API endpoints for customer
 */

/**
 * @swagger
 * /customer:
 *   get:
 *     tags: [Customer]
 *     summary: Get all customers
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.get('/', customerController.getAllCustomers);

/**
 * @swagger
 * /customer:
 *   post:
 *     tags: [Customer]
 *     summary: Add a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Customer successfully added
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post('/', validCustomer, customerController.addCustomer);

/**
 * @swagger
 * /customer/{id}:
 *   get:
 *     tags: [Customer]
 *     summary: Get a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', customerController.getCustomerById);

/**
 * @swagger
 * /customer/{id}:
 *   put:
 *     tags: [Customer]
 *     summary: Update a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer successfully updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', customerController.updateCustomer);

/**
 * @swagger
 * /customer/{id}:
 *   delete:
 *     tags: [Customer]
 *     summary: Delete a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer successfully deleted
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', customerController.removeCustomer);

module.exports = router;
