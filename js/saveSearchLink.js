// Save the search link
function saveSearchLink() {
    const title = document.getElementById('search-link-title').value.trim();
    const url = document.getElementById('search-link-url').value.trim();
    
    if (!title) {
        alert('Please enter a link title');
        return;
    }
    
    if (!url) {
        alert('Please enter a URL');
        return;
    }
    
    // Check if URL contains the search placeholder
    if (!url.includes('{search}')) {
        alert('URL must contain {search} placeholder for the search value');
        return;
    }
    
    // Validate URL format (without the placeholder)
    const testUrl = url.replace('{search}', 'test');
    if (!isValidUrl(testUrl)) {
        alert('Please enter a valid URL format');
        return;
    }
    
    // Create the search link
    const searchLink = {
        id: 'search-link-' + Date.now(),
        title: title,
        url: url,
        isSearchLink: true
    };
    
    // Add to current tab
    currentTab.links.push(searchLink);
    saveWorkbooks();
    renderLinks(currentTab);
    
    document.getElementById('create-search-link-modal').style.display = 'none';
    isCreatingSearchLink = false;
}