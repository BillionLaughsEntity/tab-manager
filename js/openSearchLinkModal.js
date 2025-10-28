// Open a search link (show modal to enter search value)
function openSearchLinkModal(link) {
    searchLinkToOpen = link;
    document.getElementById('search-value-input').value = '';
    
    // Update preview
    const previewElement = document.getElementById('search-value-preview-text');
    const previewUrl = link.url.replace('{search}', '<span class="search-value-highlight">[enter value]</span>');
    previewElement.innerHTML = previewUrl;
    
    document.getElementById('search-value-modal').style.display = 'flex';
}