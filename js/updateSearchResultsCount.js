// Optional: Add search results counter
function updateSearchResultsCount(searchResults) {
    const totalResults = 
        searchResults.workbooks.size + 
        searchResults.profiles.size + 
        searchResults.environments.size + 
        searchResults.tabs.size;
    
    // You could display this count somewhere in the UI
    console.log(`Search found ${totalResults} matches across ${searchResults.workbooks.size} workbooks, ${searchResults.profiles.size} profiles, ${searchResults.environments.size} environments, and ${searchResults.tabs.size} tabs`);
    
    // Optional: Show count in search input placeholder or nearby element
    const searchContainer = document.querySelector('.search-container');
    let countBadge = searchContainer.querySelector('.search-count-badge');
    
    if (totalResults > 0) {
        if (!countBadge) {
            countBadge = document.createElement('span');
            countBadge.className = 'search-count-badge';
            searchContainer.appendChild(countBadge);
        }
        countBadge.textContent = totalResults;
        countBadge.style.display = 'inline-block';
    } else if (countBadge) {
        countBadge.style.display = 'none';
    }
}