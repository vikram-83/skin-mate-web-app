// SkinMate Server - Main Entry Point

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const skinRoutes = require('./routes/skinRoutes');
const productRoutes = require('./routes/productRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for client
app.use(express.static(__dirname + '/../client'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/skin', skinRoutes);
app.use('/api/products', productRoutes);
app.use('/api/chat', chatRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'SkinMate API is running' });
});

// Serve client pages
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../client/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/../client/login.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/../client/register.html');
});

app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/../client/dashboard.html');
});

app.get('/result', (req, res) => {
    res.sendFile(__dirname + '/../client/result.html');
});

app.get('/chatbot', (req, res) => {
    res.sendFile(__dirname + '/../client/chatbot.html');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`SkinMate server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
});

module.exports = app;