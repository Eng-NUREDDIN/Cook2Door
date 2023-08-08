const express = require('express');

const router = express.Router();
const  authMiddleware  = require('../configuration/authMiddleware');
const orderController = require('../controllers/orderController');



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
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - name: Authorization
 *       in: header
 *       required: true
 *       type: string
 *       description: The authorization token
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
 *       401:
 *         description: Unauthorized
 */
router.post('/',authMiddleware, orderController.addOrder);

/**
 * @swagger
 * /api/order/{orderId}:
 *   get:
 *     tags: [Order]
 *     summary: Get a order by ID
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
 *       401:
 *         description: Unauthorized
 */
router.put('/:orderId',authMiddleware, orderController.updateOrderByOrderId);

/**
 * @swagger
 * /api/order/{orderId}:
 *   delete:
 *     tags: [Order]
 *     summary: Delete a order by ID
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
 *         description: Order successfully deleted
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized
 */
router.delete('/:orderId',authMiddleware, orderController.removeOrder);

/**
 * @swagger
 * /api/order/customerId/{customerId}:
 *   get:
 *     tags: [Customer]
 *     summary: get Orders by customerId
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
 *         description: JSON file including all orders by this customer
 *       400:
 *         description: Invalid Customer ID
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized
 */
router.get('/customerId/:customerId',authMiddleware, orderController.getAllOrdersByCustomerId);

/**
 * @swagger
 * /api/order/cookId/{cookId}:
 *   get:
 *     tags: [Cooks]
 *     summary: get Orders by cookId
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
 *       201:
 *         description: JSON file including all orders by this cook
 *       400:
 *         description: Invalid cook ID
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized
 */
router.get('/cookId/:cookId',authMiddleware, orderController.getAllOrdersByCookId);

/**
 * @swagger
 * /api/order/{customerId}/{orderId}:
 *   put:
 *     tags: [Customer]
 *     summary: Update order by customerId and orderId
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - name: Authorization
 *       in: header
 *       required: true
 *       type: string
 *       description: The authorization token
 *     - name: customerId
 *       in: path
 *       required: true
 *       schema:
 *       type: string
 *     - in: path
 *       name: orderId
 *       required: true
 *       schema:
 *       type: string
 *     responses:
 *       201:
 *         description: updated order
 *       400:
 *         description: Invalid cook ID
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized
 */
router.put('/:customerId/:orderId',authMiddleware, orderController.updateOrderByCustomerId);

/**
 * @swagger
 * /api/order/{orderId}/{cookId}/stateUpdate:
 *   put:
 *     tags: [Customer]
 *     summary: Update the state of order
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - name: Authorization
 *       in: header
 *       required: true
 *       type: string
 *       description: The authorization token
 *     - name: customerId
 *       in: path
 *       required: true
 *       schema:
 *       type: string
 *     - in: path
 *       name: orderId
 *       required: true
 *       schema:
 *       type: string
 *     responses:
 *       201:
 *         description: updated order
 *       400:
 *         description: Invalid cook ID
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized
 */
router.put('/:orderId/:cookId/stateUpdate',authMiddleware, orderController.updateOrderState);

module.exports = router;
