const userSchema = require('../models/userSchema')
const mongoose = require('mongoose');

/**
 * Return all users
 * @param {*} res 
 * @param {*} req 
 */
async function getAllUsers (req, res) {
    
    //  Implement Your Code Here

}

/**
 * Sig UP the user
 * @param {*} req 
 * @param {*} res 
 */
async function signUp (req, res){

    //  Implement Your Code Here

}

/**
 * SignIn the User
 * @param {*} req 
 * @param {*} res 
 */
async function signIn (req, res){

    //  Implement Your Code Here

}

/**
 * Update the User
 * @param {*} req 
 * @param {*} res 
 */
async function updateUser (req, res){

    //  Implement Your Code Here

}

/**
 * Remove the user
 * @param {*} req 
 * @param {*} res 
 */
async function removeUser (req, res){

    //  Implement Your Code Here

}

module.exports = { 
    getAllUsers, 
    signIn, 
    signUp, 
    updateUser,
    removeUser
}