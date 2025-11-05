// Setup search functionality
function setupSearchFunctionality() {
    console.log('Setting up search functionality...');
    
    const globalSearch = document.getElementById('global-search');
    const searchClear = document.getElementById('search-clear');
    const searchSuggestions = document.getElementById('search-suggestions');
    
    if (!globalSearch) {
        console.error('Global search input not found');
        return false;
    }
    
    // Input event for search suggestions
    globalSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value;
        if (typeof showSearchSuggestions === 'function') {
            showSearchSuggestions(searchTerm);
        }
    });
    
    // Clear search
    if (searchClear) {
        searchClear.addEventListener('click', () => {
            globalSearch.value = '';
            globalSearch.focus();
            if (typeof hideSearchSuggestions === 'function') {
                hideSearchSuggestions();
            }
            if (typeof clearSearch === 'function') {
                clearSearch();
            }
        });
    }
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchSuggestions.contains(e.target) && e.target !== globalSearch) {
            if (typeof hideSearchSuggestions === 'function') {
                hideSearchSuggestions();
            }
        }
    });
    
    // Enter key to perform full search
    globalSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (typeof performSearch === 'function') {
                performSearch(globalSearch.value);
            }
            if (typeof hideSearchSuggestions === 'function') {
                hideSearchSuggestions();
            }
        }
    });
    
    console.log('Search functionality setup complete');
    return true;
}