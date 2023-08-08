const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

const { validCustomer } = require('../validation/validator');
const  authMiddleware  = require('../configuration/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: API endpoints for customer
 */
/**
 * @swagger
 * /api/customer:
 *   get:
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - name: Authorization
 *       in: header
 *       required: true
 *       type: string
 *       description: The authorization token
 *     tags: [Customer]
 *     summary: Get all customers
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized
 */
router.get('/',authMiddleware, customerController.getAllCustomers);

router.post('/', customerController.addCustomer);

/**
 * @swagger
 * /api/customer:
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
 * /api/customer/{id}:
 *   get:
 *     tags: [Customer]
 *     summary: Get a customer by ID
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - name: Authorization
 *       in: header
 *       required: true
 *       type: string
 *       description: The authorization token
 *     - name: id
 *       in: path
 *       required: true
 *       schema:
 *       type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized
 */

router.get('/:id',authMiddleware, customerController.getCustomerById);

/**
 * @swagger
 * /api/customer/{id}:
 *   put:
 *     tags: [Customer]
 *     summary: Update a customer by ID
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - name: Authorization
 *       in: header
 *       required: true
 *       type: string
 *       description: The authorization token
 *     - name: id
 *       in: path
 *       required: true
 *       schema:
 *       type: string
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
 *       401:
 *         description: Unauthorized
 */
router.put('/:id',authMiddleware, customerController.updateCustomer);

/**
 * @swagger
 * /api/customer/{id}:
 *   delete:
 *     tags: [Customer]
 *     summary: Delete a customer by ID
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - name: Authorization
 *       in: header
 *       required: true
 *       type: string
 *       description: The authorization token
 *     - name: id
 *       in: path
 *       required: true
 *       schema:
 *       type: string
 *     responses:
 *       200:
 *         description: Customer successfully deleted
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id',authMiddleware, customerController.removeCustomer);

module.exports = router;
