// SkinMate Main Application

document.addEventListener('DOMContentLoaded', () => {
    console.log('SkinMate App Loaded');
    
    // Initialize navigation
    initNavigation();
    
    // Check authentication status
    checkAuthStatus();
});

// Navigation initialization
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// Check authentication status
function checkAuthStatus() {
    const token = localStorage.getItem('skinmate_token');
    const user = localStorage.getItem('skinmate_user');
    
    if (token && user) {
        console.log('User is logged in');
        updateUIForLoggedInUser(JSON.parse(user));
    } else {
        console.log('User is not logged in');
    }
}

// Update UI for logged in user
function updateUIForLoggedInUser(user) {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        // Add user profile link if not exists
        if (!document.querySelector('.user-profile')) {
            const profileLink = document.createElement('li');
            profileLink.className = 'user-profile';
            profileLink.innerHTML = `<a href="#">${user.name || 'Profile'}</a>`;
            navLinks.appendChild(profileLink);
        }   
    }
}

// API helper functions
async function apiCall(endpoint, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    const token = localStorage.getItem('skinmate_token');
    if (token) {
        defaultOptions.headers['Authorization'] = `Bearer ${token}`;
    }
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    try {
       const response = await fetch('https://skin-mate-web-app.onrender.com/api/products');
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'API call failed');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#2ecc71' : '#3498db'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Load and display products
async function loadProducts() {
    try {
        const response = await fetch('https://skin-mate-web-app.onrender.com/api/products');
        const data = await response.json();
        
        if (response.ok && data.products) {
            displayProducts(data.products);
        } else {
            showNotification('Failed to load products', 'error');
        }
    } catch (error) {
        console.error('Error loading products:', error);
        showNotification('Error loading products', 'error');
    }
}

// Display products in a modal or section
function displayProducts(products) {
    const productsHtml = products.map(product => `
        <div class="product-card">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            <span class="category">${product.category}</span>
        </div>
    `).join('');
    
    // Create a modal to show products
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    modal.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 10px; max-width: 800px; max-height: 80vh; overflow-y: auto;">
            <h2>Products</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
                ${productsHtml}
            </div>
            <button onclick="this.closest('.product-modal').remove()" class="btn btn-primary" style="margin-top: 1rem;">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Initialize product button listener
document.addEventListener('DOMContentLoaded', () => {
    const viewProductsBtn = document.getElementById('viewProductsBtn');
    if (viewProductsBtn) {
        viewProductsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loadProducts();
        });
    }
});

// Export functions for use in other modules
window.SkinMate = {
    apiCall,
    showNotification,
    checkAuthStatus,
    loadProducts,
};