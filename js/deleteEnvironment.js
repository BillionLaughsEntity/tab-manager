// Update deleteEnvironment function
function deleteEnvironment(environment) {
    console.log('=== DELETE ENVIRONMENT DEBUG ===');
    console.log('Deleting environment:', environment);
    
    if (!environment) return;
    
    // Get DOM elements at the start
    const linksGrid = document.getElementById('links-grid');
    const noTabsMessage = document.getElementById('no-tabs-message');
    const addLinkSection = document.getElementById('add-link-section');
    const reorderLinksBtn = document.getElementById('reorder-links-btn');
    const currentTabName = document.getElementById('current-tab-name');
    
    // Move all tabs and links to trash before deleting
    if (environment.tabs) {
        environment.tabs.forEach(tab => {
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
                        parentEnvironment: {
                            id: environment.id,
                            name: environment.name
                        },
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
        });
    }
    
    saveTrashBin();
    
    // Now remove the environment
    const currentProfile = getCurrentProfile();
    if (currentProfile) {
        currentProfile.environments = currentProfile.environments.filter(env => env !== environment);
    }
    
    // Reset current environment if it was deleted - FIXED VERSION
    if (currentEnvironment === environment) {
        currentEnvironment = null;
        currentTab = null;
        
        // Clear the UI properly
        if (linksGrid) {
            linksGrid.innerHTML = '';
            linksGrid.style.display = 'none';
        }
        if (noTabsMessage) noTabsMessage.style.display = 'block';
        if (addLinkSection) addLinkSection.style.display = 'none';
        if (reorderLinksBtn) reorderLinksBtn.style.display = 'none';
        if (currentTabName) currentTabName.textContent = 'Select a tab to get started';
        
        // Call renderLinks with null to clear the display
        renderLinks(null);
    }
    
    saveWorkbooks();
    renderEnvironments();
    
    console.log('Environment deleted successfully');
}