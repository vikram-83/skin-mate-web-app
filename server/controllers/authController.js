// SkinMate Auth Controller

const User = require('../models/User');
const { users } = require('../config/db');

// Generate JWT token (simple version)
function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
    };
    return Buffer.from(JSON.stringify(payload)).toString('base64');
}

// Register new user
exports.register = (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        console.log('Registration request:', { name, email });
        
        // Validate input
        const validation = User.validate({ name, email, password });
        if (!validation.isValid) {
            console.log('Validation failed:', validation.errors);
            return res.status(400).json({
                success: false,
                message: validation.errors.join(', '),
            });
        }
        
        // Check if user already exists
        const existingUser = users.findByEmail(email);
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({
                success: false,
                message: 'Email already registered',
            });
        }
        
        // Create new user
        const userData = { name, email, password };
        const newUser = users.create(userData);
        
        console.log('User created successfully:', newUser);
        
        // Generate token
        const token = generateToken(newUser);
        
        res.status(201).json({
            success: true,
            message: 'Registration successful',
            token,
            user: newUser.toJSON(),
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed',
        });
    }
};

// Login user
exports.login = (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log('Login request:', { email });
        
        // Find user
        const user = users.findByEmail(email);
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }
        
        console.log('User found, checking password');
        
        // Check password
        if (user.password !== password) {
            console.log('Password mismatch');
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }
        
        console.log('Login successful for:', email);
        
        // Generate token
        const token = generateToken(user);
        
        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: user.toJSON(),
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed',
        });
    }
};

// Get user profile
exports.getProfile = (req, res) => {
    try {
        const user = req.user;
        res.json({
            success: true,
            user: user.toJSON(),
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get profile',
        });
    }
};

// Update user profile
exports.updateProfile = (req, res) => {
    try {
        const userId = req.user.id;
        const { name, skinType, preferences } = req.body;
        
        const updatedUser = users.update(userId, { name, skinType, preferences });
        
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        
        res.json({
            success: true,
            message: 'Profile updated',
            user: updatedUser.toJSON(),
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile',
        });
    }
};

// Logout user
exports.logout = (req, res) => {
    // In a real app, you might want to blacklist the token
    res.json({
        success: true,
        message: 'Logout successful',
    });
};