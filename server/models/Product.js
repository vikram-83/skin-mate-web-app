class Product {
    constructor(data) {
        this.id = data.id;
        this.name = data.name?.trim();
        this.category = data.category;
        this.price = data.price;
        this.description = data.description?.trim();
        this.skinTypes = data.skinTypes || ['all'];
        this.ingredients = data.ingredients || [];
        this.image = data.image || '';
        this.rating = Math.min(Math.max(data.rating || 0, 0), 5);
        this.reviews = Array.isArray(data.reviews) ? data.reviews : [];
        this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
    }

    static validate(data) {
        const errors = [];

        if (!data.id) {
            errors.push('Product ID is required');
        }

        if (!data.name || data.name.trim().length < 2) {
            errors.push('Product name is required');
        }

        const validCategories = [
            'cleanser', 'toner', 'serum', 'moisturizer',
            'sunscreen', 'treatment', 'mask', 'eyeCream'
        ];

        if (!validCategories.includes(data.category)) {
            errors.push('Invalid product category');
        }

        if (data.price == null || data.price < 0) {
            errors.push('Valid price is required');
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }

    isSuitableFor(skinType) {
        return this.skinTypes.includes('all') || this.skinTypes.includes(skinType);
    }

    static getCategoryName(category) {
        const categories = {
            cleanser: 'Cleanser',
            toner: 'Toner',
            serum: 'Serum',
            moisturizer: 'Moisturizer',
            sunscreen: 'Sunscreen',
            treatment: 'Treatment',
            mask: 'Mask',
            eyeCream: 'Eye Cream',
        };
        return categories[category] || category;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            category: this.category,
            categoryName: this.constructor.getCategoryName(this.category),
            price: this.price,
            description: this.description,
            skinTypes: this.skinTypes,
            ingredients: this.ingredients,
            image: this.image,
            rating: this.rating,
            reviewCount: this.reviews.length,
        };
    }
}

module.exports = Product;