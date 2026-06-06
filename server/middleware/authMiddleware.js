// SkinMate Auth Middleware

// Simple token verification (for demo purposes)
// In production, use proper JWT verification with jsonwebtoken package

exports.verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'No token provided',
            });
        }
        
        const token = authHeader.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token format',
            });
        }
        
        // Decode token (simple base64 decode for demo)
        // In production, use proper JWT verification
        let decoded;
        try {
            decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
        } catch (e) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token',
            });
        }
        
        // Get user from database
        const { users } = require('../config/db');
        const user = users.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }
        
        // Attach user to request
        req.user = user;
        
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({
            success: false,
            message: 'Authentication failed',
        });
    }
};

// Optional auth - doesn't fail if no token
exports.optionalAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');
            
            try {
                const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
                const { users } = require('../config/db');
                const user = users.findById(decoded.id);
                
                if (user) {
                    req.user = user;
                }
            } catch (e) {
                // Token invalid, continue without user
            }
        }
        
        next();
    } catch (error) {
        next();
    }
};

// Check if user is admin
exports.isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Admin access required',
        });
    }
    
    next();
};