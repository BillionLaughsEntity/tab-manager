// Helper function to import regular links (with backward compatibility)
function importRegularLink(linkElement, index) {
    const titleElement = linkElement.getElementsByTagName('title')[0];
    const urlElement = linkElement.getElementsByTagName('url')[0];
    
    // Check for old multi-link format without type attribute
    if (!titleElement) {
        const titleAttr = linkElement.getAttribute('title');
        if (titleAttr) {
            // This is likely an old multi-link card format
            const urlElements = linkElement.getElementsByTagName('url');
            const urls = [];
            for (let m = 0; m < urlElements.length; m++) {
                urls.push(urlElements[m].textContent || '#');
            }
            
            if (urls.length > 0) {
                return {
                    id: linkElement.getAttribute('id') || 'multi-link-' + Date.now() + index,
                    title: titleAttr,
                    urls: urls,
                    isMultiLink: true,
                    linkCount: urls.length
                };
            }
        }
    } else if (titleElement && urlElement) {
        // Regular single link
        return {
            id: linkElement.getAttribute('id') || 'link-' + Date.now() + index,
            title: titleElement.textContent || 'Imported Link ' + (index + 1),
            url: urlElement.textContent || '#'
        };
    }
    
    return null;
}