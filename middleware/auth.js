const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1️⃣ Check if token exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided.' });
    }

    // 2️⃣ Extract token
    const token = authHeader.split(' ')[1];

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');

    // 4️⃣ Attach decoded payload to request
    req.user = {
      id: decoded.id,
      email: decoded.email
    };

    next();
  } catch (err) {
    console.error('JWT Auth Error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};
