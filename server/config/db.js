// SkinMate Database Configuration

// In production, use MongoDB or another database
// For demo purposes, using in-memory storage

const db = {
    users: new Map(),
    skinReports: new Map(),
    products: new Map(),
    chats: new Map(),
};

// Initialize with sample products
const sampleProducts = [
    {
        id: '1',
        name: 'Gentle Foam Cleanser',
        category: 'cleanser',
        price: 25.99,
        description: 'A gentle, pH-balanced cleanser for all skin types',
        skinTypes: ['normal', 'combination', 'sensitive'],
        ingredients: ['Water', 'Glycerin', 'Sodium Cocoyl Isethionate'],
        image: '/images/product1.jpg',
    },
    {
        id: '2',
        name: 'Hydrating Moisturizer',
        category: 'moisturizer',
        price: 35.99,
        description: 'Lightweight, oil-free moisturizer with hyaluronic acid',
        skinTypes: ['oily', 'combination'],
        ingredients: ['Water', 'Hyaluronic Acid', 'Niacinamide'],
        image: '/images/product2.jpg',
    },
    {
        id: '3',
        name: 'Rich Cream Moisturizer',
        category: 'moisturizer',
        price: 42.99,
        description: 'Deeply hydrating cream for dry skin',
        skinTypes: ['dry', 'normal'],
        ingredients: ['Water', 'Shea Butter', 'Jojoba Oil'],
        image: '/images/product3.jpg',
    },
    {
        id: '4',
        name: 'Salicylic Acid Treatment',
        category: 'treatment',
        price: 28.99,
        description: 'Spot treatment for acne and blemishes',
        skinTypes: ['oily', 'combination'],
        ingredients: ['Salicylic Acid', 'Tea Tree Oil', 'Niacinamide'],
        image: '/images/product4.jpg',
    },
    {
        id: '5',
        name: 'Mineral Sunscreen SPF 30',
        category: 'sunscreen',
        price: 32.99,
        description: 'Gentle mineral sunscreen for sensitive skin',
        skinTypes: ['all'],
        ingredients: ['Zinc Oxide', 'Titanium Dioxide', 'Aloe Vera'],
        image: '/images/product5.jpg',
    },
    {
        id: '6',
        name: 'Calming Serum',
        category: 'serum',
        price: 48.99,
        description: 'Soothing serum for sensitive and irritated skin',
        skinTypes: ['sensitive', 'dry'],
        ingredients: ['Centella Asiatica', 'Green Tea Extract', 'Panthenol'],
        image: '/images/product6.jpg',
    },
];

// Initialize products
sampleProducts.forEach(product => {
    db.products.set(product.id, product);
});

// Database helper functions
const dbHelpers = {
    // User operations
    users: {
        findById: (id) => db.users.get(id),
        findByEmail: (email) => {
            for (const user of db.users.values()) {
                if (user.email === email) return user;
            }
            return null;
        },
        create: (user) => {
            const id = Date.now().toString();
            const newUser = { ...user, id, createdAt: new Date() };
            db.users.set(id, newUser);
            return newUser;
        },
        update: (id, data) => {
            const user = db.users.get(id);
            if (user) {
                const updated = { ...user, ...data };
                db.users.set(id, updated);
                return updated;
            }
            return null;
        },
        delete: (id) => db.users.delete(id),
    },
    
    // Skin report operations
    skinReports: {
        findById: (id) => db.skinReports.get(id),
        findByUserId: (userId) => {
            const reports = [];
            for (const report of db.skinReports.values()) {
                if (report.userId === userId) reports.push(report);
            }
            return reports;
        },
        create: (report) => {
            const id = Date.now().toString();
            const newReport = { ...report, id, createdAt: new Date() };
            db.skinReports.set(id, newReport);
            return newReport;
        },
    },
    
    // Product operations
    products: {
        findAll: () => Array.from(db.products.values()),
        findById: (id) => db.products.get(id),
        findByCategory: (category) => {
            return Array.from(db.products.values()).filter(p => p.category === category);
        },
        findBySkinType: (skinType) => {
            return Array.from(db.products.values()).filter(p => 
                p.skinTypes.includes('all') || p.skinTypes.includes(skinType)
            );
        },
    },
    
    // Chat operations
    chats: {
        findByUserId: (userId) => {
            return db.chats.get(userId) || [];
        },
        save: (userId, messages) => {
            db.chats.set(userId, messages);
        },
        clear: (userId) => {
            db.chats.delete(userId);
        },
    },
};

module.exports = {
    db,
    ...dbHelpers,
};