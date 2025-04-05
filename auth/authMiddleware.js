import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';


// ✅ Function to generate (encode) a JWT
export const encodeToken = (payload, expiresIn = '4d') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// ✅ Function to verify (decode) a JWT
export const decodeToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null; // Or throw error
  }
};

// ✅ Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = decodeToken(token);

  if (!decoded) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  req.user = decoded;
  next();
};

export default authMiddleware;
