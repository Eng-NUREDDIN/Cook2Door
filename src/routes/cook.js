const express = require("express");
const router = express.Router();

const cookController = require('../controllers/cookController')
const {validCook} = require('../validation/validator')

router.get('/', cookController.getAllCooks)
router.post('/add', validCook, cookController.addCook)
router.get('/:id', cookController.getCookById)
router.put('/:id', cookController.updateCook)
router.delete('/:id', cookController.removeCook)


// for future
// router.get('/comment/{id}', cookController.getCookComment)
// router.post("/:id/likes", cookController.updateLikes);

module.exports = router;