
const cookSchema = require('../models/cookSchema');
const crypto = require('crypto');

/**
 * Generate a random secret key for encryption/decryption
 * @returns {string} - The random secret key
 */
function generateRandomKey() {
  return crypto.randomBytes(32).toString('hex'); // 32 bytes for AES-256
}

/**
 * Encrypt data using a provided key
 * @param {string} data - The data to encrypt
 * @param {string} key - The secret key for encryption
 * @returns {string} - The encrypted data
 */
function encrypt(data, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

/**
 * Decrypt data using a provided key
 * @param {string} encryptedData - The encrypted data
 * @param {string} key - The secret key for decryption
 * @returns {string} - The decrypted data
 */
function decrypt(encryptedData, key) {
  const [iv, encryptedText] = encryptedData.split(':').map((part) => Buffer.from(part, 'hex'));
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

/**
 * This returns all cooks
 * @param {*} req
 * @param {*} res
 */
async function getAllCooks(req, res) {
  try {
    const cooks = await cookSchema.find();
    // Decrypt the data before responding
    const decryptedCooks = cooks.map((cook) => ({
      ...cook.toObject(),
      // Add more fields here if needed
    }));
    res.status(200).json(decryptedCooks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

/**
 * Add a new cook into the cook schema
 * @param {*} req
 * @param {*} res
 */
async function addCook(req, res) {
  try {
    // Generate a unique secret key for this data entry
    const secretKey = generateRandomKey();
    // Encrypt the input data before saving
    const encryptedData = encrypt(JSON.stringify(req.body), secretKey);
    const newCook = new cookSchema({ encryptedData, secretKey });
    const savedCook = await newCook.save();
    res.status(200).json(savedCook);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

/**
 * Get a cook by its id
 * @param {*} req
 * @param {*} res
 */
async function getCookById(req, res) {
  try {
    const cookId = req.params.id;
    const cook = await cookSchema.findById(cookId);
    if (!cook) {
      res.status(404).json({ error: 'Cook not found' });
    } else {
      // Decrypt the data before responding
      const decryptedCook = {
        ...JSON.parse(decrypt(cook.encryptedData, cook.secretKey)),
        // Add more fields here if needed
      };
      res.status(200).json(decryptedCook);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
async function removeCook(req, res) {
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
async function updateCook(req, res) {
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

