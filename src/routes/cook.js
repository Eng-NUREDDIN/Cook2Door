/**
 * @swagger
 * tags:
 *   name: Cooks
 *   description: Cook management API for adding, updating, deleting and getting cooks.
 */
const express = require('express');

const router = express.Router();

const cookController = require('../controllers/cookController');
const { validCook } = require('../validation/validator');
const  authMiddleware  = require('../configuration/authMiddleware');

/**
 * @swagger
 * /api/cook:
 *   get:
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - name: Authorization
 *       in: header
 *       required: true
 *       type: string
 *       description: The authorization token
 *     summary: Get all cooks
 *     tags: [Cooks]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 *       401:
 *         description: Unauthorized
 */
router.get('/',authMiddleware, cookController.getAllCooks);

/**
 * @swagger
 * /api/cook/add:
 *   post:
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - name: Authorization
 *       in: header
 *       required: true
 *       type: string
 *       description: The authorization token
 *     summary: Add a new cook
 *     tags: [Cooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cook_Add'
 *     responses:
 *       201:
 *         description: Cook successfully added
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized
 */
router.post('/add',authMiddleware, cookController.addCook);
/**
 * @swagger
 * /api/cook/{id}:
 *   get:
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - name: Authorization
 *       in: header
 *       required: true
 *       type: string
 *       description: The authorization token
 *     summary: Get a cook by ID
 *     tags: [Cooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cook_Get_By_ID'
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Cook not found
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized
 */
router.get('/:id',authMiddleware, cookController.getCookById);
/**
 * @swagger
 * /api/cook/{id}:
 *   put:
 *     security:
 *     - bearerAuth: []
 *     summary: Update a cook by ID
 *     tags: [Cooks]
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
 *             $ref: '#/components/schemas/Cook_Update'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Cook not found
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized
 */
router.put('/:id',authMiddleware, cookController.updateCook);
/**
 * @swagger
 * /api/cook/{id}:
 *   delete:
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - name: Authorization
 *       in: header
 *       required: true
 *       type: string
 *       description: The authorization token
 *     summary: Delete a cook by ID
 *     tags: [Cooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cook_Delete'
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Cook not found
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id',authMiddleware, cookController.removeCook);

// for future
// router.get('/comment/{id}', cookController.getCookComment)
// router.post("/:id/likes", cookController.updateLikes);

module.exports = router;
