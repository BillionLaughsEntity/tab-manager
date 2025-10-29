// Add this function to manually migrate data if automatic migration didn't work
function forceMigrateOldData() {
    const hasOldProfiles = localStorage.getItem('tabManagerProfiles');
    
    if (hasOldProfiles) {
        if (confirm('Found old profile data. Would you like to migrate it to the new workbook structure?')) {
            try {
                const oldProfiles = JSON.parse(hasOldProfiles);
                
                workbooks = [{
                    id: 'workbook-' + Date.now(),
                    name: 'Migrated Workbook',
                    color: '#9b59b6',
                    profiles: oldProfiles
                }];
                
                saveWorkbooks();
                
                // Update UI
                renderWorkbookTabs();
                renderProfileTabs();
                
                if (workbooks.length > 0 && workbooks[0].profiles.length > 0) {
                    currentWorkbookId = workbooks[0].id;
                    currentProfileId = workbooks[0].profiles[0].id;
                    renderEnvironments();
                }
                
                alert('Migration completed successfully! Your old data has been restored.');
                
            } catch (error) {
                alert('Migration failed: ' + error.message);
            }
        }
    } else {
        alert('No old profile data found to migrate.');
    }
}