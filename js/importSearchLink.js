// Helper function to import search links
function importSearchLink(linkElement, index) {
    const titleElement = linkElement.getAttribute('title');
    const urlElement = linkElement.getElementsByTagName('url')[0];
    
    if (titleElement && urlElement) {
        return {
            id: linkElement.getAttribute('id') || 'search-link-' + Date.now() + index,
            title: titleElement,
            url: urlElement.textContent || '#',
            isSearchLink: true
        };
    }
    return null;
}