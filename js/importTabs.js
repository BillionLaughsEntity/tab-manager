// Helper function to import tabs
function importTabs(tabsElement) {
    const tabs = [];
    const tabElements = tabsElement.getElementsByTagName('tab');
    
    for (let k = 0; k < tabElements.length; k++) {
        const tabElement = tabElements[k];
        const tab = {
            id: tabElement.getAttribute('id') || 'tab-' + Date.now() + k,
            name: tabElement.getAttribute('name') || 'Imported Tab ' + (k + 1),
            links: []
        };
        
        const linksElement = tabElement.getElementsByTagName('links')[0];
        if (linksElement) {
            tab.links = importLinks(linksElement);
        }
        
        tabs.push(tab);
    }
    
    return tabs;
}