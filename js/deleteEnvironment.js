// Update deleteEnvironment function
function deleteEnvironment(environment) {
    if (!environment) return;
    
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
    currentProfile.environments = currentProfile.environments.filter(env => env !== environment);
    
    // Reset current environment if it was deleted
    if (currentEnvironment === environment) {
        currentEnvironment = null;
        currentTab = null;
        renderLinks(null);
    }
    
    saveWorkbooks();
    renderEnvironments();
}