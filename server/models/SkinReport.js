// SkinMate SkinReport Model

class SkinReport {
    constructor(data) {
        this.id = data.id;
        this.userId = data.userId;
        this.skinType = data.skinType;
        this.characteristics = data.characteristics || [];
        this.recommendations = data.recommendations || [];
        this.tips = data.tips || [];
        this.answers = data.answers || {};
        this.createdAt = data.createdAt || new Date();
    }
    
    // Skin type definitions
    static skinTypes = {
        normal: {
            name: 'Normal',
            characteristics: [
                'Balanced moisture and oil production',
                'Small pores',
                'Smooth texture',
                'Few blemishes',
            ],
            recommendations: [
                'Gentle cleanser',
                'Light moisturizer',
                'SPF 30+ sunscreen',
            ],
            tips: [
                'Maintain a consistent skincare routine',
                'Stay hydrated',
                'Use gentle products',
            ],
        },
        oily: {
            name: 'Oily',
            characteristics: [
                'Excess sebum production',
                'Enlarged pores',
                'Shiny appearance',
                'Prone to acne',
            ],
            recommendations: [
                'Foaming cleanser',
                'Oil-free moisturizer',
                'Salicylic acid treatment',
            ],
            tips: [
                'Cleanse twice daily',
                'Avoid heavy creams',
                'Use oil-free products',
            ],
        },
        dry: {
            name: 'Dry',
            characteristics: [
                'Tight feeling skin',
                'Flaky or scaly texture',
                'Fine lines more visible',
                'Dull appearance',
            ],
            recommendations: [
                'Cream cleanser',
                'Rich moisturizer',
                'Hyaluronic acid serum',
            ],
            tips: [
                'Use lukewarm water',
                'Apply moisturizer on damp skin',
                'Avoid hot showers',
            ],
        },
        combination: {
            name: 'Combination',
            characteristics: [
                'Oily T-zone',
                'Dry cheeks',
                'Enlarged pores in T-zone',
                'Occasional breakouts',
            ],
            recommendations: [
                'Gentle foaming cleanser',
                'Lightweight moisturizer',
                'Balancing toner',
            ],
            tips: [
                'Use different products for different areas',
                'Spot treat oily areas',
                'Keep cheeks moisturized',
            ],
        },
        sensitive: {
            name: 'Sensitive',
            characteristics: [
                'Easily irritated',
                'Redness and inflammation',
                'Reactive to products',
                'Prone to allergic reactions',
            ],
            recommendations: [
                'Fragrance-free cleanser',
                'Calming moisturizer',
                'Mineral sunscreen',
            ],
            tips: [
                'Patch test new products',
                'Avoid harsh ingredients',
                'Keep skincare simple',
            ],
        },
    };
    
    // Analyze skin type from answers
    static analyze(answers) {
        let score = {
            normal: 0,
            oily: 0,
            dry: 0,
            combination: 0,
            sensitive: 0,
        };
        
        // Scoring algorithm
        if (answers.oiliness === 'very_oily') score.oily += 3;
        else if (answers.oiliness === 'oily') score.oily += 2;
        else if (answers.oiliness === 'dry') score.dry += 2;
        else if (answers.oiliness === 'very_dry') score.dry += 3;
        
        if (answers.sensitivity === 'high') score.sensitive += 3;
        else if (answers.sensitivity === 'medium') score.sensitive += 2;
        
        if (answers.pores === 'large') score.oily += 2;
        else if (answers.pores === 'small') score.normal += 1;
        
        // Find highest score
        let maxType = 'normal';
        let maxScore = 0;
        
        for (const [type, value] of Object.entries(score)) {
            if (value > maxScore) {
                maxScore = value;
                maxType = type;
            }
        }
        
        const skinData = this.skinTypes[maxType];
        
        return {
            skinType: maxType,
            name: skinData.name,
            characteristics: skinData.characteristics,
            recommendations: skinData.recommendations,
            tips: skinData.tips,
        };
    }
    
    // Convert to JSON
    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            skinType: this.skinType,
            characteristics: this.characteristics,
            recommendations: this.recommendations,
            tips: this.tips,
            createdAt: this.createdAt,
        };
    }
}

module.exports = SkinReport;