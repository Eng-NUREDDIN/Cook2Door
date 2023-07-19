const express = require('express');

const router = express.Router();

const orderController = require('../controllers/orderController');
const { validOrder } = require('../validation/validator');

router.get('/', orderController.getAllOrders);
router.get('/:orderId', orderController.getOrderByOrderId);
router.get('/customerId/:customerId', orderController.getAllOrdersByCustomerId)
router.get('/cookId/:cookId', orderController.getAllOrdersByCookId)
router.post('/', orderController.addOrder);
router.put('/:orderId', orderController.updateOrderByOrderId);
router.put('/:customerId/:orderId', orderController.updateOrderByCustomerId)
router.put('/:orderId/:cookId/stateUpdate', orderController.updateOrderState)
router.delete('/:orderId', orderController.removeOrder);


module.exports = router;
