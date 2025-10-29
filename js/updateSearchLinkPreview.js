// Update the search link preview
function updateSearchLinkPreview() {
    const url = document.getElementById('search-link-url').value;
    const previewElement = document.getElementById('search-link-preview-text');
    
    if (!url) {
        previewElement.textContent = 'Enter URL to see preview';
        return;
    }
    
    // Check if URL contains a search parameter placeholder
    if (url.includes('{search}')) {
        const previewUrl = url.replace('{search}', '<span class="search-value-highlight">[search value]</span>');
        previewElement.innerHTML = previewUrl;
    } else {
        previewElement.textContent = 'URL should contain {search} placeholder for the search value';
        previewElement.style.color = '#e74c3c';
    }
}