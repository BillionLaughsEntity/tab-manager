// getCurrentProfile.js - Fixed version
function getCurrentProfile() {
    console.log('=== GET CURRENT PROFILE DEBUG ===');
    console.log('currentWorkbookId:', currentWorkbookId);
    console.log('currentProfileId:', currentProfileId);
    console.log('workbooks:', workbooks);
    
    if (!currentWorkbookId || !currentProfileId) {
        console.log('No current workbook or profile ID set');
        return null;
    }
    
    const currentWorkbook = workbooks.find(w => w.id === currentWorkbookId);
    console.log('Current workbook found:', currentWorkbook);
    
    if (!currentWorkbook) {
        console.error('Current workbook not found');
        return null;
    }
    
    const currentProfile = currentWorkbook.profiles.find(p => p.id === currentProfileId);
    console.log('Current profile found:', currentProfile);
    
    if (!currentProfile) {
        console.error('Current profile not found in workbook');
        // Try to fall back to first profile
        if (currentWorkbook.profiles.length > 0) {
            console.log('Falling back to first profile');
            currentProfileId = currentWorkbook.profiles[0].id;
            return currentWorkbook.profiles[0];
        }
        return null;
    }
    
    return currentProfile;
}