// SkinMate Chat Logic - Simple AI Response System

// Response patterns for skincare questions
const responsePatterns = {
    greeting: {
        keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good evening'],
        responses: [
            "Hello! I'm your skincare assistant. How can I help you today?",
            "Hi there! I can help you with skincare advice. What would you like to know?",
            "Hello! Ask me anything about skincare!",
        ],
    },
    skin_type: {
        keywords: ['skin type', 'my skin', 'what is my skin', 'determine skin type'],
        responses: [
            "To determine your skin type, I recommend completing our skin analysis in the Dashboard. It asks a few simple questions about your skin's oiliness, sensitivity, and concerns.",
            "You can find your skin type by taking our analysis in the Dashboard. It only takes a minute!",
        ],
    },
    acne: {
        keywords: ['acne', 'pimple', 'breakout', 'blemish', 'pimples', 'whitehead', 'blackhead'],
        responses: [
            "For acne concerns, I recommend:\n1) Use a gentle cleanser with salicylic acid\n2) Avoid touching your face\n3) Use non-comedogenic products\n4) Don't over-exfoliate\n5) Consider consulting a dermatologist for persistent issues",
            "To help with breakouts:\n• Cleanse twice daily\n• Use salicylic acid products\n• Keep hair away from face\n• Change pillowcases regularly\n• Don't pick at blemishes",
        ],
    },
    dryness: {
        keywords: ['dry', 'dryness', 'flaky', 'tight', 'dehydrated'],
        responses: [
            "For dry skin:\n• Use a cream-based cleanser\n• Apply moisturizer on damp skin\n• Use products with hyaluronic acid\n• Drink plenty of water\n• Use a humidifier",
            "To combat dryness:\n1) Switch to a gentle, cream cleanser\n2) Apply moisturizer within 3 minutes of showering\n3) Look for ingredients like hyaluronic acid, ceramides, and glycerin\n4) Avoid hot water when washing",
        ],
    },
    oily: {
        keywords: ['oily', 'greasy', 'shiny', 'excess oil'],
        responses: [
            "For oily skin:\n• Use a foaming cleanser\n• Use oil-free products\n• Blot excess oil throughout the day\n• Consider products with niacinamide\n• Don't over-strip skin (can cause more oil)",
            "Managing oily skin:\n1) Cleanse with a gentle foaming cleanser\n2) Use lightweight, gel-based moisturizers\n3) Look for niacinamide to control sebum\n4) Carry blotting papers\n5) Use salicylic acid toners",
        ],
    },
    combination: {
        keywords: ['combination', 'combo skin', 't-zone'],
        responses: [
            "For combination skin:\n• Use a gentle, pH-balanced cleanser\n• Apply lighter products on oily areas\n• Use richer products on dry areas\n• Consider double moisturizing technique\n• Don't over-dry the oily areas",
            "Combination skin tips:\n1) Use different products for different areas\n2) Spot treat oily T-zone\n3) Keep cheeks well-moisturized\n4) Use balancing toners",
        ],
    },
    sensitive: {
        keywords: ['sensitive', 'irritation', 'redness', 'reactive'],
        responses: [
            "For sensitive skin:\n• Use fragrance-free products\n• Patch test everything new\n• Avoid essential oils and alcohol\n• Look for calming ingredients like centella, aloe\n• Use mineral sunscreen",
            "Sensitive skin care:\n1) Keep routine simple\n2) Choose hypoallergenic products\n3) Avoid over-exfoliation\n4) Look for: centella asiatica, allantoin, panthenol\n5) Always wear sunscreen",
        ],
    },
    routine: {
        keywords: ['routine', 'regimen', 'steps', 'order', 'morning', 'evening', 'am', 'pm'],
        responses: [
            "Basic skincare routine:\n\nAM:\n1) Cleanser (if needed)\n2) Treatment (serum)\n3) Moisturizer\n4) Sunscreen (SPF 30+)\n\nPM:\n1) Oil cleanser (if wearing makeup/sunscreen)\n2) Water-based cleanser\n3) Treatment (retinol, acids - at night)\n4) Moisturizer/cream",
            "Simple routine order:\n1) Cleanser - removes dirt\n2) Toner - balances pH (optional)\n3) Serum - targets concerns\n4) Moisturizer - locks in hydration\n5) Sunscreen - protects (AM only)",
        ],
    },
    sunscreen: {
        keywords: ['sunscreen', 'spf', 'sun protection', 'uv', 'sunburn', 'suntan'],
        responses: [
            "Sunscreen is essential!\n• Use SPF 30+ daily\n• Apply generously (2 finger lengths for face)\n• Reapply every 2 hours when outdoors\n• Look for broad-spectrum\n• Chemical or mineral - both work",
            "Sun protection tips:\n1) Use SPF 30+ every day (even indoors!)\n2) Reapply every 2 hours\n3) Use broad-spectrum for UVA/UVB\n4) Don't forget: neck, ears, hands\n5) Seek shade 10am-4pm",
        ],
    },
    products: {
        keywords: ['product', 'recommend', 'suggestion', 'buy', 'what to use'],
        responses: [
            "I can recommend products based on your skin type! Complete the skin analysis in the Dashboard, and I'll show you personalized recommendations.",
            "Product recommendations depend on your skin type. Take the skin analysis in the Dashboard to get tailored product suggestions!",
        ],
    },
    ingredients: {
        keywords: ['ingredient', 'hyaluronic', 'retinol', 'niacinamide', 'salicylic', 'vitamin c'],
        responses: [
            "Common beneficial ingredients:\n• Hyaluronic Acid - hydration\n• Niacinamide - pores & oil control\n• Retinol - anti-aging\n• Vitamin C - brightening\n• Salicylic Acid - acne\n• Ceramides - barrier repair",
            "Key ingredients to look for:\n- Dry skin: hyaluronic acid, ceramides\n- Oily skin: niacinamide, salicylic acid\n- Aging: retinol, vitamin C\n- Sensitive: centella, allantoin",
        ],
    },
    aging: {
        keywords: ['aging', 'wrinkle', 'fine lines', 'age', 'older', 'young'],
        responses: [
            "Anti-aging tips:\n• Use retinol at night\n• Wear sunscreen daily\n• Use vitamin C in morning\n• Stay hydrated\n• Get enough sleep\n• Don't forget neck and hands",
            "For youthful skin:\n1) Always use sunscreen\n2) Add retinol slowly (2-3x/week)\n3) Use vitamin C serum\n4) Moisturize and hydrate\n5) Get 7-8 hours sleep\n6) Don't smoke",
        ],
    },
    thanks: {
        keywords: ['thank', 'thanks', 'appreciate', 'helpful'],
        responses: [
            "You're welcome! Is there anything else I can help you with?",
            "Happy to help! Let me know if you have more questions.",
            "My pleasure! Feel free to ask anytime.",
        ],
    },
    goodbye: {
        keywords: ['bye', 'goodbye', 'see you', 'later', 'farewell'],
        responses: [
            "Take care! Remember to maintain a consistent skincare routine. Chat anytime you have questions!",
            "Goodbye! Don't forget to sunscreen! ☀️",
            "See you next time! Take care of your skin!",
        ],
    },
};

// Default responses
const defaultResponses = [
    "I'm here to help with your skincare questions! You can ask me about:\n• Your skin type\n• Acne and breakouts\n• Dry or oily skin concerns\n• Skincare routines\n• Product recommendations\n• Anti-aging tips\n\nWhat would you like to know?",
    "Great question! I can help with:\n- Skin type analysis\n- Product recommendations\n- Skincare routine building\n- Dealing with specific concerns\n\nWhat would you like to explore?",
    "I'd love to help with your skincare! Here are some things I can assist with:\n• Understanding your skin type\n• Building a routine\n• Product suggestions\n• Troubleshooting issues\n\nWhat interests you?",
];

// Generate response based on user message
function generateResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check each category for matching keywords
    for (const [category, data] of Object.entries(responsePatterns)) {
        for (const keyword of data.keywords) {
            if (message.includes(keyword)) {
                // Randomly select a response from the category
                const responses = data.responses;
                const randomIndex = Math.floor(Math.random() * responses.length);
                return responses[randomIndex];
            }
        }
    }
    
    // No match - return a default response
    const randomIndex = Math.floor(Math.random() * defaultResponses.length);
    return defaultResponses[randomIndex];
}

module.exports = {
    generateResponse,
    responsePatterns,
};