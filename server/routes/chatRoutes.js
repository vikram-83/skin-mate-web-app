// SkinMate Chat Routes

const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes (for demo - in production, require auth)
router.post('/message', chatController.sendMessage);

// Protected routes
router.get('/history', authMiddleware.verifyToken, chatController.getHistory);
router.delete('/clear', authMiddleware.verifyToken, chatController.clearHistory);

module.exports = router;