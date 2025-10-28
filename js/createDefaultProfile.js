// Create a default profile with sample data
function createDefaultProfile() {
    const currentWorkbook = getCurrentWorkbook();
    
    // Ensure the workbook has a profiles array
    if (!currentWorkbook.profiles) {
        currentWorkbook.profiles = [];
    }
    
    const defaultProfile = {
        id: 'profile-' + Date.now(),
        name: 'Default Profile',
        color: '#3498db',
        environments: []
    };
    
    currentWorkbook.profiles.push(defaultProfile);
    currentProfileId = defaultProfile.id;
    saveWorkbooks();
    
    // Update UI
    renderProfileTabs();
}