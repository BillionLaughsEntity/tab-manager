// switchProfile.js - Fixed version
function switchProfile(profile) {
    console.log('=== SWITCH PROFILE DEBUG ===');
    console.log('Switching to profile:', profile);
    
    if (!profile) {
        console.error('No profile provided to switchProfile');
        return;
    }
    
    currentProfileId = profile.id;
    currentEnvironment = null;
    currentTab = null;
    
    console.log('Updated current state:', {
        currentProfileId: currentProfileId,
        currentEnvironment: currentEnvironment,
        currentTab: currentTab
    });
    
    // Save the current state
    saveWorkbooks();
    
    // Re-render everything that depends on the profile
    renderEnvironments();
    
    // Update the profile tabs to show which one is active
    updateProfileTabsHighlight();
    
    // Clear the links display since we're switching profiles
    const linksGrid = document.getElementById('links-grid');
    const noTabsMessage = document.getElementById('no-tabs-message');
    
    if (linksGrid) linksGrid.style.display = 'none';
    if (noTabsMessage) noTabsMessage.style.display = 'block';
    
    // Update tab header
    document.getElementById('current-tab-name').textContent = 'Select a tab';
    
    console.log('Profile switch completed');
}

function updateProfileTabsHighlight() {
    console.log('Updating profile tabs highlight');
    const profileTabs = document.querySelectorAll('.profile-tab');
    
    profileTabs.forEach(tab => {
        if (tab.dataset.profileId === currentProfileId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}