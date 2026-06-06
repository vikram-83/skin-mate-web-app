// SkinMate Chat Model

class Chat {
    constructor(data) {
        this.id = data.id;
        this.userId = data.userId;
        this.messages = data.messages || [];
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }
    
    // Add message to chat
    addMessage(role, content) {
        this.messages.push({
            role,
            content,
            timestamp: new Date().toISOString(),
        });
        this.updatedAt = new Date();
        
        return this;
    }
    
    // Get chat history
    getHistory() {
        return this.messages;
    }
    
    // Clear chat history
    clear() {
        this.messages = [];
        this.updatedAt = new Date();
        
        return this;
    }
    
    // Get last N messages
    getRecentMessages(count = 10) {
        return this.messages.slice(-count);
    }
    
    // Convert to JSON
    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            messages: this.messages,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}

module.exports = Chat;