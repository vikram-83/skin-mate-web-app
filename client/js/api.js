// SkinMate API Module

const API_BASE_URL = 'https://skin-mate-web-app.onrender.com/api';

// Generic API request handler
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    // Add authentication token if available
    const token = localStorage.getItem('skinmate_token');
    if (token) {
        defaultOptions.headers['Authorization'] = `Bearer ${token}`;
    }
    
    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    };
    
    try {
        const response = await fetch(url, mergedOptions);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Auth API
export const authAPI = {
    login: (credentials) => 
        apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        }),
    
    register: (userData) => 
        apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        }),
    
    logout: () => 
        apiRequest('/auth/logout', {
            method: 'POST',
        }),
    
    getProfile: () => 
        apiRequest('/auth/profile', {
            method: 'GET',
        }),
    
    updateProfile: (data) => 
        apiRequest('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
};

// Skin Analysis API
export const skinAPI = {
    analyze: (answers) => 
        apiRequest('/skin/analyze', {
            method: 'POST',
            body: JSON.stringify(answers),
        }),
    
    getResults: () => 
        apiRequest('/skin/results', {
            method: 'GET',
        }),
    
    getHistory: () => 
        apiRequest('/skin/history', {
            method: 'GET',
        }),
};

// Product API
export const productAPI = {
    getAll: (filters = {}) => {
        const params = new URLSearchParams(filters);
        return apiRequest(`/products?${params}`, {
            method: 'GET',
        });
    },
    
    getById: (id) => 
        apiRequest(`/products/${id}`, {
            method: 'GET',
        }),
    
    getRecommendations: (skinType) => 
        apiRequest(`/products/recommendations?skinType=${skinType}`, {
            method: 'GET',
        }),
    
    getByCategory: (category) => 
        apiRequest(`/products?category=${category}`, {
            method: 'GET',
        }),
};

// Chat API
export const chatAPI = {
    sendMessage: (message) => 
        apiRequest('/chat/message', {
            method: 'POST',
            body: JSON.stringify({ message }),
        }),
    
    getHistory: () => 
        apiRequest('/chat/history', {
            method: 'GET',
        }),
    
    clearHistory: () => 
        apiRequest('/chat/clear', {
            method: 'DELETE',
        }),
};

// Export default API functions
export default {
    auth: authAPI,
    skin: skinAPI,
    products: productAPI,
    chat: chatAPI,
    request: apiRequest,
};