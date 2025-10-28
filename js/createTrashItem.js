// Helper function to create trash item
function createTrashItem(itemElement, index) {
    const originElement = itemElement.getElementsByTagName('origin')[0];
    
    const trashedItem = {
        id: itemElement.getAttribute('id') || 'trash-' + Date.now() + index,
        title: itemElement.getElementsByTagName('title')[0]?.textContent || 'Deleted Item',
        url: itemElement.getElementsByTagName('url')[0]?.textContent || '#',
        deletedAt: itemElement.getAttribute('deletedAt') || new Date().toISOString(),
        origin: originElement ? {
            profileId: originElement.getElementsByTagName('profileId')[0]?.textContent || '',
            profileName: originElement.getElementsByTagName('profileName')[0]?.textContent || '',
            environmentId: originElement.getElementsByTagName('environmentId')[0]?.textContent || '',
            environmentName: originElement.getElementsByTagName('environmentName')[0]?.textContent || '',
            tabId: originElement.getElementsByTagName('tabId')[0]?.textContent || '',
            tabName: originElement.getElementsByTagName('tabName')[0]?.textContent || ''
        } : null
    };
    
    // Handle different link types
    const typeElement = itemElement.getElementsByTagName('type')[0];
    if (typeElement) {
        const type = typeElement.textContent;
        if (type === 'multi') {
            trashedItem.isMultiLink = true;
            processMultiLinkUrls(itemElement, trashedItem);
        } else if (type === 'search') {
            trashedItem.isSearchLink = true;
        }
    }
    
    // Check if it's a multi-link by presence of urls element (backward compatibility)
    const urlsElement = itemElement.getElementsByTagName('urls')[0];
    if (urlsElement && !trashedItem.isMultiLink) {
        trashedItem.isMultiLink = true;
        processMultiLinkUrls(itemElement, trashedItem);
    }
    
    return trashedItem;
}