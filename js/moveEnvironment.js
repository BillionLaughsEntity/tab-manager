// Fix moveEnvironment function to handle cross-workbook moves
function moveEnvironment(environment, destinationProfile) {
    console.log('Moving environment:', environment.name, 'to profile:', destinationProfile.name);
    
    const currentProfile = getCurrentProfile();
    
    // Remove environment from current profile
    currentProfile.environments = currentProfile.environments.filter(env => env.id !== environment.id);
    
    // Add environment to destination profile
    if (!destinationProfile.environments) {
        destinationProfile.environments = [];
    }
    destinationProfile.environments.push(environment);
    
    saveWorkbooks();
    renderEnvironments();
    updateAllCounters();
    
    // Clear current selection if the moved environment was selected
    if (currentEnvironment === environment) {
        currentEnvironment = null;
        currentTab = null;
        noTabsMessage.style.display = 'block';
        linksGrid.style.display = 'none';
        addLinkSection.style.display = 'none';
        reorderLinksBtn.style.display = 'none';
        currentTabName.textContent = 'Select a tab to get started';
    }
    
    // Show success message
    alert(`Environment "${environment.name}" moved successfully to "${destinationProfile.name}"`);
}