  const express = require('express');

 const router = express.Router();

const orderController = require('../controllers/orderController');
//const { validOrder } = require('../validation/validator');


/**
 * @swagger
 * tags:
 *   name: Order
 *   description: API endpoints for Order
 */


/**
 * @swagger
 * /api/order/:
 *   get:
 *     tags: [Order]
 *     summary: Get all Order
 *     responses:
 *       201:
 *         description: Successful operation
 *       400:
 *         description: Internal server error
 */
router.get('/', orderController.getAllOrders);

/**
 * @swagger
 * /api//Order/:
 *   post:
 *     tags: [Order]
 *     summary: Add a new Order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order_Add'
 *     responses:
 *       201:
 *         description: Order successfully added
 *       404:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post('/', orderController.addOrder);


/**
 * @swagger
 * /api/order/{orderId}:
 *   get:
 *     tags: [Order]
 *     summary: Get a order by ID
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       400: 
 *         description: Invalid request
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get('/:orderId', orderController.getOrderByOrderId);

/**
 * @swagger
 * /api/order/{orderId}:
 *   put:
 *     tags: [Order]
 *     summary: Update a order by ID
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order_Update'
 *     responses:
 *       200:
 *         description: Order successfully updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.put('/:orderId', orderController.updateOrderByOrderId);

/**
 * @swagger
 * /api/order/{orderId}:
 *   delete:
 *     tags: [Order]
 *     summary: Delete a order by ID
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order successfully deleted
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:orderId', orderController.removeOrder);

/**
 * @swagger
 * /api/order/customerId/{customerId}:
 *   get:
 *     tags: [Customer]
 *     summary: get Orders by customerId
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: JSON file including all orders by this customer
 *       400:
 *         description: Invalid Customer ID
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get('/customerId/:customerId', orderController.getAllOrdersByCustomerId)

/**
 * @swagger
 * /api/order/cookId/{cookId}:
 *   get:
 *     tags: [Cooks]
 *     summary: get Orders by cookId
 *     parameters:
 *       - in: path
 *         name: cookId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: JSON file including all orders by this cook
 *       400:
 *         description: Invalid cook ID
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get('/cookId/:cookId', orderController.getAllOrdersByCookId)

/**
 * @swagger
 * /api/order/{customerId}/{orderId}:
 *   put:
 *     tags: [Customer]
 *     summary: Update order by customerId and orderId
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: updated order
 *       400:
 *         description: Invalid cook ID
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.put('/:customerId/:orderId', orderController.updateOrderByCustomerId)

/**
 * @swagger
 * /api/order/{orderId}/{cookId}/stateUpdate:
 *   put:
 *     tags: [Customer]
 *     summary: Update the state of order
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: updated order
 *       400:
 *         description: Invalid cook ID
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.put('/:orderId/:cookId/stateUpdate', orderController.updateOrderState)

 module.exports = router;


