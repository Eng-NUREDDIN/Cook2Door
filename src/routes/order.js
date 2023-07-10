const express = require("express");
const router = express.Router();

const orderController = require('../controllers/orderController')
const {validOrder} = require('../validation/validator')

router.get('/', orderController.getAllOrders)
router.post('/', validOrder, orderController.addOrder)
router.get('/:id', orderController.getOrderById)
router.put('/:id', orderController.updateOrder)
router.delete('/:id', orderController.updateOrder)


module.exports = router;