// Ensure the search suggestions container is positioned correctly
function positionSearchSuggestions() {
    const searchContainer = document.querySelector('.search-container');
    const suggestions = document.getElementById('search-suggestions');
    
    if (searchContainer && suggestions) {
        // The CSS should handle positioning, but we can ensure it
        suggestions.style.width = searchContainer.offsetWidth + 'px';
    }
}