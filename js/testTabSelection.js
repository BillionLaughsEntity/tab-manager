// Add this temporary test function
function testTabSelection() {
    console.log('=== TESTING TAB SELECTION ===');
    const currentProfile = getCurrentProfile();
    if (currentProfile && currentProfile.environments.length > 0) {
        const firstEnv = currentProfile.environments[0];
        if (firstEnv.tabs.length > 0) {
            const firstTab = firstEnv.tabs[0];
            console.log('Testing selection of tab:', firstTab.name);
            selectTab(firstTab, firstEnv);
        }
    }
}