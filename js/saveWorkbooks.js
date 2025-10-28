// Override the existing saveWorkbooks function to be version-aware
function saveWorkbooks() {

    console.log('💾 Saving workbooks to localStorage:', workbooks);
    localStorage.setItem('tabManagerWorkbooks', JSON.stringify(workbooks));

    try {
        const dataToSave = {
            workbooks: workbooks,
            currentWorkbookId: currentWorkbookId,
            currentProfileId: currentProfileId
        };
        
        // Save with version prefix
        localStorage.setItem(`${APP_VERSION}_tabManagerData`, JSON.stringify(dataToSave));
        console.log(`Data saved for ${APP_VERSION}`);
        
    } catch (error) {
        console.error('Error saving data:', error);
    }

    // Verify it was saved
    const saved = JSON.parse(localStorage.getItem('tabManagerWorkbooks'));
    console.log('✅ Verified saved workbooks:', saved);
    
}