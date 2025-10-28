// Add a new link to a tab
function addLink(tab, title, url) {
    // Ensure URL has a protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    const newLink = {
        id: 'link-' + Date.now(),
        title: title,
        url: url
    };
    
    tab.links.push(newLink);
    saveWorkbooks();
    renderLinks(tab);
    refreshCounters(); // ADD THIS LINE
}