// renderLinks.js - Fixed version
function renderLinks() {
    console.log('=== RENDER LINKS DEBUG ===');
    console.log('Current tab:', currentTab);
    
    const linksGrid = document.getElementById('links-grid');
    const noTabsMessage = document.getElementById('no-tabs-message');
    
    if (!linksGrid || !noTabsMessage) {
        console.error('Links container elements not found');
        return;
    }
    
    // Clear previous content
    linksGrid.innerHTML = '';
    linksGrid.style.display = 'none';
    noTabsMessage.style.display = 'block';
    
    if (!currentTab) {
        console.log('No current tab selected');
        noTabsMessage.innerHTML = '<h2>Welcome to Tab Manager</h2><p>Select a tab to view its links</p>';
        return;
    }
    
    console.log('Current tab links:', currentTab.links);
    
    if (!currentTab.links || currentTab.links.length === 0) {
        console.log('No links in current tab');
        noTabsMessage.innerHTML = '<h2>No Links Yet</h2><p>Click "Add Link" to create your first link in this tab</p>';
        return;
    }
    
    // Hide no links message and show grid
    noTabsMessage.style.display = 'none';
    linksGrid.style.display = 'grid';
    
    console.log('Rendering', currentTab.links.length, 'links');
    
    // Render links based on current view type
    currentTab.links.forEach(link => {
        let linkElement;
        
        switch (currentViewType) {
            case 'list':
                linkElement = createListViewLink(link);
                break;
            case 'table':
                linkElement = createTableViewLink(link);
                break;
            case 'grid':
            default:
                linkElement = createLinkCard(link);
                break;
        }
        
        if (linkElement) {
            linksGrid.appendChild(linkElement);
        }
    });
    
    console.log('Links rendered successfully');
}