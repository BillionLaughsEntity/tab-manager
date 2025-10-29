// deleteEnvironment.js - Updated with debug logging
function deleteEnvironment(environment) {
    console.log('=== DELETE ENVIRONMENT DEBUG ===');
    console.log('Environment to delete:', environment);
    console.log('Current profile:', getCurrentProfile());
    
    if (!environment) {
        console.error('No environment provided for deletion');
        return;
    }
    
    const currentProfile = getCurrentProfile();
    if (!currentProfile) {
        console.error('No current profile found');
        return;
    }
    
    console.log('Environments before deletion:', currentProfile.environments);
    
    // Find the environment index
    const environmentIndex = currentProfile.environments.findIndex(env => env.id === environment.id);
    console.log('Environment index:', environmentIndex);
    
    if (environmentIndex === -1) {
        console.error('Environment not found in current profile');
        return;
    }
    
    // Create trash item before removal
    const trashItem = createTrashItem(environment, 'environment');
    console.log('Created trash item:', trashItem);
    
    // Remove the environment
    const deletedEnvironment = currentProfile.environments.splice(environmentIndex, 1)[0];
    console.log('Deleted environment:', deletedEnvironment);
    
    // Add to trash bin
    trashBin.push(trashItem);
    console.log('Trash bin after deletion:', trashBin);
    
    // Save changes
    saveWorkbooks();
    saveTrashBin();
    console.log('Data saved successfully');
    
    // Update UI
    renderEnvironments();
    updateAllCounters();
    
    console.log('Environment deletion completed successfully');
    console.log('Environments after deletion:', currentProfile.environments);
}