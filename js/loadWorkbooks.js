// Override the existing loadWorkbooks function to be version-aware  
function loadWorkbooks() {
    try {
        // Try to load version-specific data first
        const versionData = localStorage.getItem(`${APP_VERSION}_tabManagerData`);
        if (versionData) {
            console.log(`Loading ${APP_VERSION} data`);
            const data = JSON.parse(versionData);
            workbooks = data.workbooks || [];
            currentWorkbookId = data.currentWorkbookId || null;
            currentProfileId = data.currentProfileId || null;
            return;
        }
        
        // Fallback: try to migrate old data
        const oldData = localStorage.getItem('tabManagerData');
        if (oldData) {
            console.log('Migrating old data to versioned storage');
            localStorage.setItem(`${APP_VERSION}_tabManagerData`, oldData);
            const data = JSON.parse(oldData);
            workbooks = data.workbooks || [];
            currentWorkbookId = data.currentWorkbookId || null;
            currentProfileId = data.currentProfileId || null;
            return;
        }
        
        console.log('No existing data found for V18');
        
    } catch (error) {
        console.error('Error loading data:', error);
    }
}