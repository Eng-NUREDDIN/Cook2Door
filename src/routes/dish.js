const express = require('express');
const router = express.Router();

const dishController = require('../controllers/dishController');
const { validDish } = require('../validation/validator');
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
router.post('/add', dishController.addDish);

/**
 * @swagger
 * /api/dish/{id}:
 *   get:
 *     tags: [Dishes]
 *     summary: Get a dish by ID
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
 *         description: Dish not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', dishController.getDishById);

/**
 * @swagger
 * /api/dish/{id}:
 *   put:
 *     tags: [Dishes]
 *     summary: Update a dish by ID
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
 */
router.put('/:id', dishController.updateDish);

/**
 * @swagger
 * /api/dish/{id}:
 *   delete:
 *     tags: [Dishes]
 *     summary: Delete a dish by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dish successfully deleted
 *       404:
 *         description: Dish not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', dishController.removeDish);

module.exports = router;
