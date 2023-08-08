const jwt = require('jsonwebtoken');

const { check } = require('express-validator');



function authMiddleware(req, res, next) {  
  console.log(req.headers);

  const token = req.header('Authorization');
  console.log(req.header('Authorization'));
 
  

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }  
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY);

    // Store the decoded user data, including the role, in req.user
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
}

module.exports = authMiddleware;
