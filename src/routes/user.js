const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController')

router.get('/', userController.getAllUsers())
router.post('/signUp', userController.signUp())
router.post('/signIn', userController.signIn())
router.update('/;id', userController.updateUser())
router.delete('/:id', userController.removeUser())


module.exports = router;