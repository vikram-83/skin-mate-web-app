// SkinMate User Model

class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.skinType = data.skinType || null;
        this.preferences = data.preferences || {};
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }
    
    // Validate user data
    static validate(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 1) {
            errors.push('Name is required');
        }
        
        if (!data.email || !data.email.includes('@')) {
            errors.push('Valid email is required');
        }
        
        if (!data.password || data.password.length < 1) {
            errors.push('Password is required');
        }
        
        return {
            isValid: errors.length === 0,
            errors,
        };
    }
    
    // Convert to JSON (without password)
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            skinType: this.skinType,
            preferences: this.preferences,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
    
    // Compare password
    comparePassword(password) {
        return this.password === password;
    }
    
    // Update user profile
    updateProfile(data) {
        if (data.name) this.name = data.name;
        if (data.skinType) this.skinType = data.skinType;
        if (data.preferences) this.preferences = { ...this.preferences, ...data.preferences };
        this.updatedAt = new Date();
        
        return this;
    }
}

module.exports = User;