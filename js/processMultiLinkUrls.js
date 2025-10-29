// Helper function to process multi-link URLs
function processMultiLinkUrls(itemElement, trashedItem) {
    const urlsElement = itemElement.getElementsByTagName('urls')[0];
    if (urlsElement) {
        const urlElements = urlsElement.getElementsByTagName('url');
        trashedItem.urls = [];
        for (let j = 0; j < urlElements.length; j++) {
            trashedItem.urls.push(urlElements[j].textContent || '#');
        }
        trashedItem.linkCount = trashedItem.urls.length;
    }
}