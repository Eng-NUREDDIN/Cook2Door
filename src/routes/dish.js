const express = require("express");
const router = express.Router();

const dishController = require('../controllers/dishController')
const {validDish} = require('../validation/validator')

router.get('/', dishController.getAllDishes)
router.post('/add', dishController.addDish)
router.get('/:id', dishController.getDishById)
router.put('/:id', dishController.updateDish)
router.delete('/:id', dishController.removeDish)


module.exports = router;