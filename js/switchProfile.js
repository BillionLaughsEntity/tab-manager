// Switch to a different profile
function switchProfile(profileId) {
    console.log('=== SWITCH PROFILE DEBUG ===');
    console.log('Switching to profile:', profileId);
    console.log('Current profile before switch:', currentProfileId);
    console.log('Current workbook:', currentWorkbookId);

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

    // Update current profile
    currentProfileId = profileId;
    console.log('Current profile after switch:', currentProfileId);
    
    // Save the change
    saveWorkbooks();
    console.log('Workbooks saved after profile switch');
    
    // Re-render everything
    console.log('Rendering environments...');
    renderEnvironments();
    
    console.log('Rendering profile tabs...');
    renderProfileTabs();
    
    console.log('Updating counters...');
    updateAllCounters();
    
    console.log('=== END SWITCH PROFILE DEBUG ===');

    
}