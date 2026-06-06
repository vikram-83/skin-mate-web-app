// SkinMate Skin Controller

const SkinReport = require('../models/SkinReport');
const { skinReports } = require('../config/db');

// Analyze skin type
exports.analyzeSkin = (req, res) => {
    try {
        const { answers } = req.body;
        
        if (!answers) {
            return res.status(400).json({
                success: false,
                message: 'Answers are required',
            });
        }
        
        // Analyze skin type
        const result = SkinReport.analyze(answers);
        
        // Save report if user is authenticated
        if (req.user) {
            skinReports.create({
                userId: req.user.id,
                ...result,
                answers,
            });
        }
        
        res.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error('Analyze error:', error);
        res.status(500).json({
            success: false,
            message: 'Analysis failed',
        });
    }
};
  
// Get skin analysis results
exports.getResults = (req, res) => {
    try {
        const userId = req.user.id;
        
        const reports = skinReports.findByUserId(userId);
        
        if (reports.length === 0) {
            return res.json({
                success: true,
                result: null,
                message: 'No analysis results found',
            });
        }
        
        // Get latest report
        const latestReport = reports[reports.length - 1];
        
        res.json({
            success: true,
            result: latestReport,
        });
    } catch (error) {
        console.error('Get results error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get results',
        });
    }
};

// Get analysis history
exports.getHistory = (req, res) => {
    try {
        const userId = req.user.id;
        
        const reports = skinReports.findByUserId(userId);
        
        res.json({
            success: true,
            history: reports.reverse(),
        });
    } catch (error) {
        console.error('Get history error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get history',    
        });
    }
};