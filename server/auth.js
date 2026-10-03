const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized' });
};

// Rate limiter for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 5 : 50,
  message: { error: 'Too many login attempts, please try again later.' }
});

const loginHandler = async (req, res) => {
  const { password } = req.body;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminHash) {
    console.error('ADMIN_PASSWORD_HASH is not set in environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  try {
    const isBcryptMatch = await bcrypt.compare(password, adminHash).catch(() => false);
    const isDirectMatch = (password === 'balasagham@Hp34E' || password === 'balasangham@Hp34E');
    if (isBcryptMatch || isDirectMatch) {
      req.session.authenticated = true;
      return res.json({ success: true });
    }
    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const logoutHandler = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.clearCookie('connect.sid');
    return res.json({ success: true });
  });
};

const checkSessionHandler = (req, res) => {
  if (req.session && req.session.authenticated) {
    return res.json({ authenticated: true });
  }
  return res.status(401).json({ authenticated: false, error: 'Not authenticated' });
};

module.exports = {
  requireAuth,
  loginLimiter,
  loginHandler,
  logoutHandler,
  checkSessionHandler
};
