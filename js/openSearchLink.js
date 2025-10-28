// Open the search link with the entered value
function openSearchLink() {
    const searchValue = document.getElementById('search-value-input').value.trim();
    
    if (!searchValue) {
        alert('Please enter a search value');
        return;
    }
    
    // Replace the placeholder with the actual search value
    const finalUrl = searchLinkToOpen.url.replace('{search}', encodeURIComponent(searchValue));
    
    // Open the link
    window.open(finalUrl, '_blank');
    
    // Close the modal
    document.getElementById('search-value-modal').style.display = 'none';
    searchLinkToOpen = null;
}