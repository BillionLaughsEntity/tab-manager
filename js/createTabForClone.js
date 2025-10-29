// Helper function to create tab during clone
function createTabForClone(profileId, environmentId) {
    const tabName = prompt('Enter name for new tab:');
    if (!tabName) return;
    
    const profile = profiles.find(p => p.id === profileId);
    if (!profile) return;
    
    const environment = profile.environments.find(env => env.id === environmentId);
    if (!environment) return;
    
    if (!environment.tabs) {
        environment.tabs = [];
    }
    
    const newTab = {
        id: 'tab-' + Date.now(),
        name: tabName,
        links: []
    };
    
    environment.tabs.push(newTab);
    saveWorkbooks();
    
    // Refresh the modal to show the new tab
    openCloneToTabModal();
}