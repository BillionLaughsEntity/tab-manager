// Switch to a different profile
function switchProfile(profileId) {
    currentProfileId = profileId;
    currentEnvironment = null;
    currentTab = null;
    
    // Clear the links display using the centralized function
    clearLinksDisplay();
    
    // Update UI
    renderEnvironments();
    
    // Update active profile tab
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.profileId === profileId) {
            tab.classList.add('active');
        }
    });
    
    // Update counters
    updateAllCounters();
    saveWorkbooks();
}