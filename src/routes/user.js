/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */


const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     description: Get a list of all users
 *     responses:
 *       200:
 *         description: Successful response with the list of users
 *       500:
 *         description: Internal Server Error
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /api/user/signUp:
 *   post:
 *     tags: [Users]
 *     summary: Sign up the User
 *     description: Sign up the User with an email, password, and role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - role
 *     responses:
 *       200:
 *         description: Successful sign-up
 *       400:
 *         description: Bad Request - Missing or empty fields
 *       500:
 *         description: Internal Server Error
 */
router.post('/signUp', userController.signUp);

/**
 * @swagger
 * /api/user/signIn:
 *   post:
 *     tags: [Users]
 *     summary: Sign in the User
 *     description: Sign in the User using their email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful sign-in
 *       400:
 *         description: Bad Request - Missing or empty fields
 *       401:
 *         description: Unauthorized - Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/signIn', userController.signIn);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update the User
 *     description: Update the User with the specified ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userSchema'
 *     responses:
 *       200:
 *         description: Successful update
 *       400:
 *         description: Bad Request - Missing or empty fields
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', userController.updateUser);
/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Remove the User
 *     description: Remove the User with the specified ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to remove
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful removal
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', userController.removeUser);

module.exports = router;
