// Update deleteTab function
function deleteTab(tab, environment) {
    if (!tab || !environment) return;
    
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
    
    // Reset current tab if it was deleted
    if (currentTab === tab) {
        currentTab = null;
        renderLinks(null);
    }
    
    saveWorkbooks();
    renderEnvironments();
}