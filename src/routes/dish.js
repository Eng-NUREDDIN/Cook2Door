const express = require('express');
const router = express.Router();

const dishController = require('../controllers/dishController');
const { validDish } = require('../validation/validator');
const  authMiddleware  = require('../configuration/authMiddleware');
/**
 * @swagger
 * tags:
 *   name: Dishes
 *   description: API endpoints for dishes
 */

/**
 * @swagger
 * /api/dish/:
 *   get:
 *     tags: [Dishes]
 *     summary: Get all dishes
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.get('/', dishController.getAllDishes);

/**
 * @swagger
 * /api/dish/add/:
 *   post:
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - name: Authorization
 *       in: header
 *       required: true
 *       type: string
 *       description: The authorization token
 *     tags: [Dishes]
 *     summary: Add a new dish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dish_Add'
 *     responses:
 *       201:
 *         description: Dish successfully added
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post('/add', authMiddleware, dishController.addDish);

/**
 * @swagger
 * /api/dish/{id}:
 *   get:
 *     tags: [Dishes]
 *     summary: Get a dish by ID
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
 *         description: Dish not found
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', dishController.getDishById);

/**
 * @swagger
 * /api/dish/{id}:
 *   put:
 *     tags: [Dishes]
 *     summary: Update a dish by ID
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
 *             $ref: '#/components/schemas/Dish_Update'
 *     responses:
 *       200:
 *         description: Dish successfully updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Dish not found
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized
 */
router.put('/:id',authMiddleware, dishController.updateDish);

/**
 * @swagger
 * /api/dish/{id}:
 *   delete:
 *     tags: [Dishes]
 *     summary: Delete a dish by ID
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
router.delete('/:id',authMiddleware, dishController.removeDish);

module.exports = router;
