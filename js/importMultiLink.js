// Helper function to import multi-links
function importMultiLink(linkElement, index) {
    const titleElement = linkElement.getAttribute('title');
    const urlElements = linkElement.getElementsByTagName('url');
    
    const urls = [];
    for (let m = 0; m < urlElements.length; m++) {
        urls.push(urlElements[m].textContent || '#');
    }
    
    if (titleElement && urls.length > 0) {
        return {
            id: linkElement.getAttribute('id') || 'multi-link-' + Date.now() + index,
            title: titleElement,
            urls: urls,
            isMultiLink: true,
            linkCount: urls.length
        };
    }
    return null;
}