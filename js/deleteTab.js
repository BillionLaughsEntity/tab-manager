// Update deleteTab function
function deleteTab(tab, environment) {
    console.log('=== DELETE TAB DEBUG ===');
    console.log('Deleting tab:', tab);
    console.log('From environment:', environment);
    
    if (!tab || !environment) return;
    
    // Get DOM elements at the start
    const linksGrid = document.getElementById('links-grid');
    const noTabsMessage = document.getElementById('no-tabs-message');
    const addLinkSection = document.getElementById('add-link-section');
    const reorderLinksBtn = document.getElementById('reorder-links-btn');
    const currentTabName = document.getElementById('current-tab-name');
    
    // Move all links to trash before deleting
    if (tab.links) {
        tab.links.forEach(link => {
            const trashItem = {
                id: 'trash-' + Date.now(),
                type: 'link',
                originalId: link.id,
                data: link,
                parentTab: {
                    id: tab.id,
                    name: tab.name
                },
                parentEnvironment: environment ? {
                    id: environment.id,
                    name: environment.name
                } : null,
                parentProfile: getCurrentProfile() ? {
                    id: getCurrentProfile().id,
                    name: getCurrentProfile().name
                } : null,
                parentWorkbook: getCurrentWorkbook() ? {
                    id: getCurrentWorkbook().id,
                    name: getCurrentWorkbook().name
                } : null,
                deletedAt: new Date().toISOString()
            };
            trashBin.push(trashItem);
        });
    }
    
    saveTrashBin();
    
    // Now remove the tab
    environment.tabs = environment.tabs.filter(t => t !== tab);
    
    // Reset current tab if it was deleted - FIXED VERSION
    if (currentTab === tab) {
        currentTab = null;
        
        // Clear the UI properly
        if (linksGrid) {
            linksGrid.innerHTML = '';
            linksGrid.style.display = 'none';
        }
        if (noTabsMessage) noTabsMessage.style.display = 'block';
        if (addLinkSection) addLinkSection.style.display = 'none';
        if (reorderLinksBtn) reorderLinksBtn.style.display = 'none';
        if (currentTabName) currentTabName.textContent = 'Select a tab';
        
        // Call renderLinks with null to clear the display
        renderLinks(null);
    }
    
    saveWorkbooks();
    renderEnvironments();
    
    console.log('Tab deleted successfully');
}