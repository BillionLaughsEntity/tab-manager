// In getCurrentProfile.js - Add error handling
function getCurrentProfile() {
    console.log('=== GET CURRENT PROFILE DEBUG ===');
    console.log('currentWorkbookId:', currentWorkbookId);
    console.log('currentProfileId:', currentProfileId);
    console.log('workbooks:', workbooks);
    
    if (!currentWorkbookId || !currentProfileId) {
        console.log('No current workbook or profile selected');
        return null;
    }
    
    const currentWorkbook = workbooks.find(w => w.id === currentWorkbookId);
    if (!currentWorkbook) {
        console.error('Current workbook not found:', currentWorkbookId);
        return null;
    }
    
    console.log('Current workbook found:', currentWorkbook);
    
    const currentProfile = currentWorkbook.profiles.find(p => p.id === currentProfileId);
    if (!currentProfile) {
        console.error('Current profile not found:', currentProfileId);
        return null;
    }
    
    console.log('Current profile found:', currentProfile);
    return currentProfile;
}