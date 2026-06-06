// SkinMate Chat Controller

const Chat = require('../models/Chat');
const { chats } = require('../config/db');
const { generateResponse } = require('../utils/chatLogic');

// Send message and get response
exports.sendMessage = (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Message is required',
            });
        }
        
        // Generate AI response
        const response = generateResponse(message);
        
        // Save to history if user is authenticated
        if (req.user) {
            const userId = req.user.id;
            let chatHistory = chats.findByUserId(userId);
            
            chatHistory.push(
                { role: 'user', content: message, timestamp: new Date().toISOString() },
                { role: 'bot', content: response, timestamp: new Date().toISOString() }
            );
            
            // Keep only last 50 messages
            if (chatHistory.length > 50) {
                chatHistory = chatHistory.slice(-50);
            }
            
            chats.save(userId, chatHistory);
        }
        
        res.json({
            success: true,
            response,
        });
    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message',
        });
    }
};

// Get chat history
exports.getHistory = (req, res) => {
    try {
        const userId = req.user.id;
        
        const history = chats.findByUserId(userId);
        
        res.json({
            success: true,
            history,
        });
    } catch (error) {
        console.error('Get history error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get history',
        });
    }
};

// Clear chat history
exports.clearHistory = (req, res) => {
    try {
        const userId = req.user.id;
        
        chats.clear(userId);
        
        res.json({
            success: true,
            message: 'Chat history cleared',
        });
    } catch (error) {
        console.error('Clear history error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to clear history',
        });
    }
};