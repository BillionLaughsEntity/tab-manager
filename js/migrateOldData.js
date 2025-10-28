function migrateOldData() {
    // Check if we have old profile data but no workbook data
    const hasOldProfiles = localStorage.getItem('tabManagerProfiles');
    const hasWorkbooks = localStorage.getItem('tabManagerWorkbooks');
    
    if (hasOldProfiles && !hasWorkbooks) {
        console.log('Migrating old profiles to workbook structure...');
        const oldProfiles = JSON.parse(hasOldProfiles);
        
        // Create a workbook with all the old profiles
        workbooks = [{
            id: 'workbook-' + Date.now(),
            name: 'My Workbook',
            color: '#9b59b6',
            profiles: oldProfiles
        }];
        
        saveWorkbooks();
        localStorage.removeItem('tabManagerProfiles');
        console.log('Migration completed successfully');
    }
}