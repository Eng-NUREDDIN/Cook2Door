const dishSchema = require('../models/dishSchema')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const axios = require('axios')

/**
 * This return all Dishs
 * @param {*} req
 * @param {*} res
 */
async function getAllDishes (req, res) {
    try {
        const dishes = await dishSchema.find();
        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Add new Dish into the Dish schema
 * @param {*} req
 * @param {*} res
 */
async function addDish (req, res) {

    try {

        // Extract dish data from the request body
        const { dish_name, dish_ingredient, cook_id}= req.body

        // Check the cook_ids
        const response = await axios.get(`http://localhost:3000/api/cook/${cook_id}`);
        const cook = response.data;

        // If cook is not found, handle the error
        if (!cook) {
            return res.status(404).json({ error: 'Cook not found' });
        }

        // Create a new dish instance
        const newDish = new dishSchema ({
            dish_name,
            dish_ingredient,
            cook_id: cook._id, // Assign the correct cook_id
        })
        
        // Save the customer to the database
        const savedDish = await newDish.save()

        res.status(201).json(savedDish);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}

/**
 * Get Dish by its id
 * @param {*} req
 * @param {*} res
 */
async function getDishById (req, res) {

    // Extract dish id from the request parameters
    const { id } = req.params;

    // For in valid Id
    if (!ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid dish ID' });
        return;
    }

    try {
        
        // Find the dish by id
        const dish = await dishSchema.findById(id);

        // Check if dish exists
        if (!dish) {
            res.status(404).json({ message: "Dish not found" });
            return;
        }
        res.status(200).json(dish);

  } catch (error) {
        res.status(500).json({ error: error.message });
  }

}

/**
 * remove the Dish based on the id
 * @param {*} req
 * @param {*} res
 */
async function removeDish (req, res) {

    // Extract dish id from the request parameters
    const { id } = req.params;

    // For in valid Id
    if (!ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid dish ID' });
        return;
    }

    try {
    
        // Find and remove the dish by id
        const removedDish = await dishSchema.findByIdAndRemove(id);
    
        // Check if dish exists
        if (!removedDish) {
          res.status(404).json({ message: "Dish not found" });
          return;
        }
        res.status(200).json({ message: "Dish removed successfully" });

      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}

/**
 * Update the Dish based on its id
 * @param {*} req
 * @param {*} res
 */
async function updateDish (req, res) {

    // Extract dish id from the request parameters
    const { id } = req.params;

    // For in valid Id
    if (!ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid dish ID' });
        return;
    }

     try {

        // Extract updated dish data from the request body
        const { dish_name, dish_ingredient }= req.body         

        // Find and update the dish by id
        const updatedDish = await dishSchema.findByIdAndUpdate(
            id,
            {
                dish_name,
                dish_ingredient
            },
            { new: true }
        );

        // Check if dish exists
        if (!updatedDish) {
        res.status(404).json({ message: "Dish not found" });
        return;
        }

        res.status(200).json(updatedDish);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { 
    getAllDishes, 
    addDish, 
    getDishById, 
    removeDish,
    updateDish
}