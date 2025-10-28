// Helper function to import links
function importLinks(linksElement) {
    const links = [];
    const linkElements = linksElement.getElementsByTagName('link');
    
    for (let l = 0; l < linkElements.length; l++) {
        const linkElement = linkElements[l];
        const linkType = linkElement.getAttribute('type') || 'single';
        
        let link = null;
        
        switch (linkType) {
            case 'search':
                link = importSearchLink(linkElement, l);
                break;
            case 'multi':
                link = importMultiLink(linkElement, l);
                break;
            default:
                link = importRegularLink(linkElement, l);
                break;
        }
        
        if (link) {
            links.push(link);
        }
    }
    
    return links;
}