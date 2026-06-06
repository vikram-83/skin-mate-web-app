// SkinMate Skin Analysis Routes

const express = require('express');
const router = express.Router();
const skinController = require('../controllers/skinController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/analyze', skinController.analyzeSkin);

// Protected routes
router.get('/results', authMiddleware.verifyToken, skinController.getResults);
router.get('/history', authMiddleware.verifyToken, skinController.getHistory);

module.exports = router;