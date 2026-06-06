// SkinMate Product Controller

const Product = require('../models/Product');
const { products } = require('../config/db');

// Get all products
exports.getAllProducts = (req, res) => {
    try {
        const { category, skinType } = req.query;
        
        let productList = products.findAll();
        
        // Filter by category
        if (category) {
            productList = productList.filter(p => p.category === category);
        }
        
        // Filter by skin type
        if (skinType) {
            productList = productList.filter(p => 
                p.skinTypes.includes('all') || p.skinTypes.includes(skinType)
            );
        }
        
        res.json({
            success: true,
            products: productList,
            count: productList.length,
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get products',
        });
    }
};

// Get product by ID
exports.getProductById = (req, res) => {
    try {
        const { id } = req.params;
        
        const product = products.findById(id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        
        res.json({
            success: true,
            product,
        });
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get product',
        });
    }
};

// Get product recommendations
exports.getRecommendations = (req, res) => {
    try {
        const { skinType } = req.params;
        
        const recommendations = products.findBySkinType(skinType);
        
        res.json({
            success: true,
            products: recommendations,
            count: recommendations.length,
        });
    } catch (error) {
        console.error('Get recommendations error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get recommendations',
        });
    }
};

// Create product (admin)
exports.createProduct = (req, res) => {
    try {
        const productData = req.body;
        
        const validation = Product.validate(productData);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: validation.errors.join(', '),
            });
        }
        
        // In a real app, you'd save to database
        res.status(201).json({
            success: true,
            message: 'Product created',
            product: productData,
        });
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create product',
        });
    }
};

// Update product (admin)
exports.updateProduct = (req, res) => {
    try {
        const { id } = req.params;
        const productData = req.body;
        
        res.json({
            success: true,
            message: 'Product updated',
            product: { id, ...productData },
        });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update product',
        });
    }
};

// Delete product (admin)
exports.deleteProduct = (req, res) => {
    try {
        const { id } = req.params;
        
        res.json({
            success: true,
            message: 'Product deleted',
        });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete product',
        });
    }
};