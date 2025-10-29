// Add this validation function
function validateMultiLinkCard(card) {
    if (!card.title || !card.urls || !Array.isArray(card.urls)) {
        return false;
    }
    
    // Validate each URL
    for (const url of card.urls) {
        if (!url || typeof url !== 'string') {
            return false;
        }
    }
    
    return true;
}