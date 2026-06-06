// SkinMate Skin Analysis Logic

// Skin type analysis based on user answers
const analyzeSkinType = (answers) => {
    let scores = {
        normal: 0,
        oily: 0,
        dry: 0,
        combination: 0,
        sensitive: 0,
    };
    
    // Oiliness scoring
    if (answers.oiliness === 'very_oily') scores.oily += 3;
    else if (answers.oiliness === 'oily') scores.oily += 2;
    else if (answers.oiliness === 'slightly_oily') scores.oily += 1;
    else if (answers.oiliness === 'dry') scores.dry += 2;
    else if (answers.oiliness === 'very_dry') scores.dry += 3;
    else if (answers.oiliness === 'normal') scores.normal += 2;
    
    // Sensitivity scoring
    if (answers.sensitivity === 'very_high') scores.sensitive += 3;
    else if (answers.sensitivity === 'high') scores.sensitive += 2;
    else if (answers.sensitivity === 'medium') scores.sensitive += 1;
    else if (answers.sensitivity === 'low') scores.normal += 1;
    
    // Pore size scoring
    if (answers.pores === 'very_large') scores.oily += 2;
    else if (answers.pores === 'large') scores.oily += 1;
    else if (answers.pores === 'small') scores.normal += 1;
    else if (answers.pores === 'very_small') scores.dry += 1;
    
    // Concerns scoring
    if (answers.concerns) {
        if (answers.concerns.includes('acne')) scores.oily += 1;
        if (answers.concerns.includes('dryness')) scores.dry += 1;
        if (answers.concerns.includes('sensitivity')) scores.sensitive += 1;
        if (answers.concerns.includes('aging')) scores.dry += 1;
    }
    
    // Find highest score
    let maxType = 'normal';
    let maxScore = 0;
    
    for (const [type, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            maxType = type;
        }
    }
    
    return maxType;
};

// Get skin type data
const getSkinTypeData = (skinType) => {
    const skinTypes = {
        normal: {
            name: 'Normal',
            characteristics: [
                'Balanced moisture and oil production',
                'Small pores',
                'Smooth texture',
                'Few blemishes',
                'Good blood circulation',
            ],
            recommendations: [
                'Gentle foam cleanser',
                'Lightweight gel moisturizer',
                'SPF 30+ sunscreen',
                'Weekly gentle exfoliation',
            ],
            tips: [
                'Maintain a consistent skincare routine',
                'Stay hydrated (8+ glasses daily)',
                'Use gentle, pH-balanced products',
                'Get 7-8 hours of sleep',
            ],
        },
        oily: {
            name: 'Oily',
            characteristics: [
                'Excess sebum production',
                'Enlarged pores',
                'Shiny appearance, especially in T-zone',
                'Prone to acne and blackheads',
                'Thicker skin texture',
            ],
            recommendations: [
                'Foaming cleanser with salicylic acid',
                'Oil-free gel moisturizer',
                'Niacinamide serum',
                'Clay mask weekly',
                'Salicylic acid spot treatment',
            ],
            tips: [
                'Cleanse twice daily with warm water',
                'Avoid heavy, occlusive products',
                'Use oil-free and non-comedogenic products',
                'Blot excess oil throughout the day',
                'Avoid touching your face',
            ],
        },
        dry: {
            name: 'Dry',
            characteristics: [
                'Tight feeling skin, especially after cleansing',
                'Flaky or scaly texture',
                'Fine lines more visible',
                'Dull or ashy appearance',
                'May feel itchy or irritated',
            ],
            recommendations: [
                'Cream cleanser or milk cleanser',
                'Rich cream moisturizer',
                'Hyaluronic acid serum',
                'Facial oil (jojoba or rosehip)',
                'Gentle enzyme exfoliator',
            ],
            tips: [
                'Use lukewarm water, not hot',
                'Apply moisturizer on damp skin',
                'Use a humidifier in dry climates',
                'Avoid long hot showers',
                'Drink plenty of water',
            ],
        },
        combination: {
            name: 'Combination',
            characteristics: [
                'Oily T-zone (forehead, nose, chin)',
                'Dry or normal cheeks',
                'Enlarged pores in T-zone',
                'Occasional breakouts in T-zone',
                'Visible pores on nose and cheeks',
            ],
            recommendations: [
                'Gentle pH-balanced cleanser',
                'Lightweight moisturizer',
                'Balancing toner for T-zone',
                'Spot treatment for breakouts',
                'Different moisturizers for different areas',
            ],
            tips: [
                'Use different products for different areas',
                'Spot treat oily areas',
                'Keep cheeks well-moisturized',
                'Use gentle products overall',
                'Avoid over-cleansing',
            ],
        },
        sensitive: {
            name: 'Sensitive',
            characteristics: [
                'Easily irritated by products',
                'Redness and inflammation',
                'Reactive to weather changes',
                'Prone to allergic reactions',
                'May burn or sting with certain products',
            ],
            recommendations: [
                'Fragrance-free, hypoallergenic cleanser',
                'Calming moisturizer with centella',
                'Mineral sunscreen (zinc/titanium)',
                'Rose water toner',
                'Barrier repair cream',
            ],
            tips: [
                'Always patch test new products',
                'Avoid harsh ingredients (fragrance, alcohol, essential oils)',
                'Keep skincare routine simple',
                'Introduce products one at a time',
                'Protect skin from sun and wind',
            ],
        },
    };
    
    return skinTypes[skinType] || skinTypes.normal;
};

// Main export
module.exports = {
    analyzeSkinType,
    getSkinTypeData,
};