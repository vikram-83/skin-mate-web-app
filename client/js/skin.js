// SkinMate Skin Analysis Module

document.addEventListener('DOMContentLoaded', () => {
    initSkinAnalysis();
});

// Skin type definitions
const skinTypes = {
    normal: {
        name: 'Normal',
        characteristics: [
            'Balanced moisture and oil production',
            'Small pores',
            'Smooth texture',
            'Few blemishes',
        ],
        products: [
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
        products: [
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
        products: [
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
        products: [
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
        products: [
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

// Initialize skin analysis
function initSkinAnalysis() {
    const analysisForm = document.getElementById('skinAnalysisForm');
    const resultPage = document.getElementById('resultPage');
    
    if (analysisForm) {
        analysisForm.addEventListener('submit', handleSkinAnalysis);
    }
    
    // Load results if on result page
    if (resultPage) {
        loadSkinResults();
    }
}

// Handle skin analysis form submission
async function handleSkinAnalysis(e) {
    e.preventDefault();
    
    const answers = collectAnswers();
    const skinType = analyzeSkinType(answers);
    
    // Save results
    localStorage.setItem('skinmate_skin_analysis', JSON.stringify(skinType));
    
    // Redirect to results page
    window.location.href = 'result.html';
}

// Collect answers from form
function collectAnswers() {
    return {
        oiliness: document.querySelector('input[name="oiliness"]:checked')?.value || 'normal',
        sensitivity: document.querySelector('input[name="sensitivity"]:checked')?.value || 'low',
        pores: document.querySelector('input[name="pores"]:checked')?.value || 'small',
        concerns: Array.from(document.querySelectorAll('input[name="concerns"]:checked')).map(el => el.value),
    };
}

// Analyze skin type based on answers
function analyzeSkinType(answers) {
    let score = {
        normal: 0,
        oily: 0,
        dry: 0,
        combination: 0,
        sensitive: 0,
    };
    
    // Simple scoring algorithm
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
    
    return {
        type: maxType,
        ...skinTypes[maxType],
    };
}

// Load skin results on result page
function loadSkinResults() {
    const results = localStorage.getItem('skinmate_skin_analysis');
    
    if (results) {
        const data = JSON.parse(results);
        displayResults(data);
    } else {
        // No results, redirect to analysis
        window.location.href = 'dashboard.html';
    }
}

// Display results
function displayResults(data) {
    const skinTypeEl = document.getElementById('skinType');
    const characteristicsEl = document.getElementById('characteristics');
    const productsEl = document.getElementById('products');
    const tipsEl = document.getElementById('tips');
    
    if (skinTypeEl) skinTypeEl.textContent = data.name;
    
    if (characteristicsEl) {
        characteristicsEl.innerHTML = data.characteristics
            .map(c => `<li>${c}</li>`)
            .join('');
    }
    
    if (productsEl) {
        productsEl.innerHTML = data.products
            .map(p => `<li>${p}</li>`)
            .join('');
    }
    
    if (tipsEl) {
        tipsEl.innerHTML = data.tips
            .map(t => `<li>${t}</li>`)
            .join('');
    }
}

// Export functions
window.SkinAnalysis = {
    analyzeSkinType,
    loadSkinResults,
    skinTypes,
};