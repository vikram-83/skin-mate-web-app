// SkinMate Chatbot Module

document.addEventListener('DOMContentLoaded', () => {
    initChatbot();
});

// Chat configuration
const CHAT_CONFIG = {
    maxHistory: 50,
    typingDelay: 500,
};

// Initialize chatbot
function initChatbot() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatBox = document.getElementById('chatBox');
    
    if (!chatBox) return;
    
    // Load chat history
    loadChatHistory();
    
    // Event listeners
    if (sendBtn) {
        sendBtn.addEventListener('click', handleSendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }
}

// Handle send message
async function handleSendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatBox = document.getElementById('chatBox');
    
    if (!chatInput || !chatBox) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Send to API or use local response
        const response = await getBotResponse(message);
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Add bot response
        addMessage(response, 'bot');
        
        // Save to history
        saveToHistory(message, response);
    } catch (error) {
        removeTypingIndicator();
        addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
}

// Add message to chat
function addMessage(text, sender) {
    const chatBox = document.getElementById('chatBox');
    if (!chatBox) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const chatBox = document.getElementById('chatBox');
    if (!chatBox) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot-message typing-indicator';
    typingDiv.innerHTML = '<p>Thinking...</p>';
    typingDiv.id = 'typingIndicator';
    
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// Get bot response
async function getBotResponse(message) {
    try {
        // Try API first
        const response = await fetch('/api/chat/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.response;
        }
    } catch (error) {
        console.log('Using local response');
    }
    
    // Fallback to local responses
    return getLocalResponse(message.toLowerCase());
}

// Local response logic
function getLocalResponse(message) {
    const responses = {
        greeting: {
            patterns: ['hello', 'hi', 'hey', 'greetings'],
            response: 'Hello! How can I help you with your skincare today?',
        },
        skin_type: {
            patterns: ['skin type', 'my skin', 'what is my skin'],
            response: 'To determine your skin type, I recommend completing our skin analysis in the Dashboard. Would you like to do that?',
        },
        acne: {
            patterns: ['acne', 'pimple', 'breakout', 'blemish'],
            response: 'For acne concerns, I recommend: 1) Use a gentle cleanser with salicylic acid, 2) Avoid touching your face, 3) Use non-comedogenic products, 4) Consider consulting a dermatologist for persistent issues.',
        },
        dryness: {
            patterns: ['dry', 'dryness', 'flaky', 'tight'],
            response: 'For dry skin: 1) Use a cream-based cleanser, 2) Apply moisturizer on damp skin, 3) Use products with hyaluronic acid, 4) Drink plenty of water.',
        },
        oily: {
            patterns: ['oily', 'greasy', 'shiny'],
            response: 'For oily skin: 1) Use a foaming cleanser, 2) Use oil-free products, 3) Blot excess oil throughout the day, 4) Consider products with niacinamide.',
        },
        routine: {
            patterns: ['routine', ' regimen', 'steps'],
            response: 'A basic skincare routine: 1) Cleanser, 2) Toner (optional), 3) Serum (optional), 4) Moisturizer, 5) Sunscreen (AM). Start simple and add products gradually.',
        },
        sunscreen: {
            patterns: ['sunscreen', 'spf', 'sun protection', 'uv'],
            response: 'Always use sunscreen! Look for SPF 30+ and broad-spectrum protection. Apply generously and reapply every 2 hours when outdoors.',
        },
        products: {
            patterns: ['product', 'recommend', 'suggestion'],
            response: 'I can recommend products based on your skin type. Would you like me to show you personalized recommendations?',
        },
        thanks: {
            patterns: ['thank', 'thanks', 'appreciate'],
            response: "You're welcome! Is there anything else I can help you with?",
        },
        goodbye: {
            patterns: ['bye', 'goodbye', 'see you'],
            response: 'Take care! Remember to maintain a consistent skincare routine. Chat anytime you have questions!',
        },
    };
    
    // Check each category
    for (const [key, data] of Object.entries(responses)) {
        for (const pattern of data.patterns) {
            if (message.includes(pattern)) {
                return data.response;
            }
        }
    }
    
    // Default response
    return "I'm here to help with your skincare questions! You can ask me about:\n- Your skin type\n- Acne and breakouts\n- Dry or oily skin concerns\n- Skincare routines\n- Product recommendations\n\nWhat would you like to know?";
}

// Save chat history
function saveToHistory(userMessage, botResponse) {
    let history = JSON.parse(localStorage.getItem('chat_history') || '[]');
    
    history.push({
        user: userMessage,
        bot: botResponse,
        timestamp: new Date().toISOString(),
    });
    
    // Keep only last N messages
    if (history.length > CHAT_CONFIG.maxHistory) {
        history = history.slice(-CHAT_CONFIG.maxHistory);
    }
    
    localStorage.setItem('chat_history', JSON.stringify(history));
}

// Load chat history
function loadChatHistory() {
    const chatBox = document.getElementById('chatBox');
    if (!chatBox) return;
    
    const history = JSON.parse(localStorage.getItem('chat_history') || '[]');
    
    // Clear existing messages except welcome
    chatBox.innerHTML = '';
    
    if (history.length === 0) {
        // Add welcome message
        addMessage("Hello! I'm your skincare assistant. How can I help you today?", 'bot');
        return;
    }
    
    // Add history
    history.forEach(msg => {
        addMessage(msg.user, 'user');
        addMessage(msg.bot, 'bot');
    });
}

// Clear chat history
function clearChatHistory() {
    localStorage.removeItem('chat_history');
    
    const chatBox = document.getElementById('chatBox');
    if (chatBox) {
        chatBox.innerHTML = '';
        addMessage("Chat history cleared. How can I help you?", 'bot');
    }
}

// Export functions
window.Chatbot = {
    handleSendMessage,
    clearChatHistory,
    addMessage,
};