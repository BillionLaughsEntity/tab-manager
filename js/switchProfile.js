// Switch to a different profile
function switchProfile(profileId) {
    console.log('=== SWITCH PROFILE DEBUG ===');
    console.log('Switching to profile:', profileId);
    console.log('Current profile before switch:', currentProfileId);
    console.log('Current workbook:', currentWorkbookId);

    // Validate the profile exists
    const currentWorkbook = getCurrentWorkbook();
    const profile = currentWorkbook.profiles.find(p => p.id === profileId);
    
    if (!profile) {
        console.error('❌ Profile not found:', profileId);
        return;
    }

    // Update current state - DO THIS ONCE
    currentProfileId = profileId;
    currentEnvironment = null;
    currentTab = null;
    
    console.log('✅ State updated - Profile:', currentProfileId, 'Environment: null, Tab: null');

    // Clear the links display using the centralized function
    clearLinksDisplay();
    
    // Update active profile tab
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.profileId === profileId) {
            tab.classList.add('active');
        }
    });
    
    // Re-render everything - IN THE CORRECT ORDER
    console.log('🔄 Rendering environments...');
    renderEnvironments();
    
    console.log('🔄 Rendering profile tabs...');
    renderProfileTabs();
    
    console.log('🔄 Updating counters...');
    updateAllCounters();

    // Save ONCE at the end
    saveWorkbooks();
    console.log('💾 Workbooks saved');
    
    console.log('=== END SWITCH PROFILE DEBUG ===');
}