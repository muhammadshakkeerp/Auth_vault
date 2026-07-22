// src/middleware/auth.js
// ONE JOB: check if the request has a valid JWT token   ??? what's the JWT token? valid & invalid token? 
// If yes → attach user info to req.user and move on  ? what info attach on req.user
// If no  → stop the request, return 401

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Token comes in the header like:
  // Authorization: Bearer eyJhbGc...
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Split "Bearer eyJhbGc..." → grab just "eyJhbGc..."
  const token = authHeader.split(' ')[1];

  try {
    // jwt.verify checks:
    // 1. Was this token signed with our secret? (tamper check)
    // 2. Has it expired?
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId to the request so every route knows WHO is asking
    req.user = { id: decoded.userId };

    next(); // ✅ token valid — continue to the actual route handler
  } catch (err) {
    // Token is invalid, expired, or tampered with
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = authMiddleware;