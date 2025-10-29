// Helper function to create environment during clone
function createEnvironmentForClone(profileId) {
    const envName = prompt('Enter name for new environment:');
    if (!envName) return;
    
    const profile = profiles.find(p => p.id === profileId);
    if (!profile) return;
    
    if (!profile.environments) {
        profile.environments = [];
    }
    
    const newEnvironment = {
        id: 'env-' + Date.now(),
        name: envName,
        tabs: []
    };
    
    profile.environments.push(newEnvironment);
    saveWorkbooks();
    
    // Refresh the modal to show the new environment
    openCloneToTabModal();
}