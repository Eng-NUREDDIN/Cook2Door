const express = require("express");
const router = express.Router();

const customerController = require('../controllers/customerController')
const {validCustomer} = require('../validation/validator')

router.get('/', customerController.getAllCustomers)
router.post('/add', customerController.addCustomer)
router.get('/:id', customerController.getCustomerById)
router.put('/:id', customerController.updateCustomer)
router.delete('/:id', customerController.removeCustomer)

module.exports = router;