const cookSchema = require('../models/cookSchema');

/**
 * This return all cooks
 * @param {*} req
 * @param {*} res
 */
async function getAllCooks(req, res) {
  try {
    const cooks = await cookSchema.find();
    res.status(200).json(cooks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

/**
 * Add new cook into the cook schema
 * @param {*} req
 * @param {*} res
 */
async function addCook(req, res) {
  if (req.user.role !== 'COOK') {
    return res.status(403).json({ error: 'Forbidden - Access denied' });
  }
  try {
    const newCook = new cookSchema(req.body);
    const savedCook = await newCook.save();
    res.status(200).json(savedCook);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

/**
 * Get cook by its id
 * @param {*} req
 * @param {*} res
 */
async function getCookById(req, res) {
  try {
    const cookId = req.params.id;
    const cook = await cookSchema.findById(cookId);
    if (!cook) {
      res.status(404).json({ error: error });
    } else {
      res.status(200).json(cook);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

/**
 * remove the cook based on the id
 * @param {*} req
 * @param {*} res
 */
async function removeCook(req, res) {
  if (req.user.role !== 'COOK' || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden - Access denied' });
  }
  try {
    const cookId = req.params.id;
    const removedCook = await cookSchema.findByIdAndRemove(cookId);
    if (!removedCook) {
      res.status(404).json({ error: error });
    } else {
      res.status(200).json(removedCook);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

/**
 * Update the cook based on its id
 * @param {*} req
 * @param {*} res
 */
async function updateCook(req, res) {
  if (req.user.role !== 'COOK' || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden - Access denied' });
  }
  try {
    const cookId = req.params.id;
    const updatedCook = await cookSchema.findByIdAndUpdate(cookId, req.body, {
      new: true,
    });
    if (!updatedCook) {
      res.status(404).json({ error: 'Cook not found' });
    } else {
      res.status(200).json(updatedCook);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllCooks: getAllCooks,
  addCook: addCook,
  getCookById: getCookById,
  removeCook: removeCook,
  updateCook: updateCook,
};
