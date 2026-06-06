// SkinMate Product Routes

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/recommendations/:skinType', productController.getRecommendations);

// Protected routes
router.post('/', authMiddleware.verifyToken, productController.createProduct);
router.put('/:id', authMiddleware.verifyToken, productController.updateProduct);
router.delete('/:id', authMiddleware.verifyToken, productController.deleteProduct);

module.exports = router;