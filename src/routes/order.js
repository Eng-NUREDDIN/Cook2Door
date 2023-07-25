  const express = require('express');

 const router = express.Router();

const orderController = require('../controllers/orderController');
const { validOrder } = require('../validation/validator');
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
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post('/', validOrder, orderController.addOrder);


/**
 * @swagger
 * /api/order/{id}:
 *   get:
 *     tags: [Order]
 *     summary: Get a order by ID
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
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

 router.get('/:id', orderController.getOrderByOrderId);

/**
 * @swagger
 * /api/order/{id}:
 *   put:
 *     tags: [Order]
 *     summary: Update a order by ID
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

 router.put('/:id', orderController.updateOrderByOrderId);

/**
 * @swagger
 * /api/order/{id}:
 *   delete:
 *     tags: [Order]
 *     summary: Delete a order by ID
 *     parameters:
 *       - in: path
 *         name: id
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

 router.delete('/:id', orderController.removeOrder);

router.get('/customerId/:customerId', orderController.getAllOrdersByCustomerId)
router.get('/cookId/:cookId', orderController.getAllOrdersByCookId)

router.put('/:customerId/:orderId', orderController.updateOrderByCustomerId)
router.put('/:orderId/:cookId/stateUpdate', orderController.updateOrderState)

 module.exports = router;


