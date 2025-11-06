// Clear the links display area
function clearLinksDisplay() {
    console.log('Clearing links display...');
    
    const linksGrid = document.getElementById('links-grid');
    const noTabsMessage = document.getElementById('no-tabs-message');
    const currentTabName = document.getElementById('current-tab-name');
    const addLinkSection = document.getElementById('add-link-section');
    
    if (linksGrid) {
        linksGrid.innerHTML = '';
        linksGrid.style.display = 'none';
    }
    
    if (noTabsMessage) {
        noTabsMessage.style.display = 'block';
    }
    
    if (currentTabName) {
        currentTabName.textContent = 'Select a tab to get started';
    }
    
    if (addLinkSection) {
        addLinkSection.style.display = 'none';
    }
    
    // Clear any selection mode
    if (isSelectionMode) {
        toggleSelectionMode();
    }
    
    console.log('Links display cleared');
}