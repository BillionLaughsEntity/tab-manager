// Migration function to copy existing data to versioned storage
function migrateToVersionedStorage() {
    console.log('Migrating existing data to versioned storage...');
    
    // Migrate main data
    const oldData = localStorage.getItem('tabManagerData');
    if (oldData && !localStorage.getItem(`${APP_VERSION}_tabManagerData`)) {
        localStorage.setItem(`${APP_VERSION}_tabManagerData`, oldData);
        console.log('Migrated main data to V18 storage');
    }
    
    // Migrate trash bin
    const oldTrash = localStorage.getItem('tabManagerTrashBin');
    if (oldTrash && !localStorage.getItem(`${APP_VERSION}_tabManagerTrashBin`)) {
        localStorage.setItem(`${APP_VERSION}_tabManagerTrashBin`, oldTrash);
        console.log('Migrated trash bin to V18 storage');
    }
    
    // Migrate workbooks (legacy)
    const oldWorkbooks = localStorage.getItem('tabManagerWorkbooks');
    if (oldWorkbooks && !localStorage.getItem(`${APP_VERSION}_tabManagerWorkbooks`)) {
        localStorage.setItem(`${APP_VERSION}_tabManagerWorkbooks`, oldWorkbooks);
        console.log('Migrated workbooks to V18 storage');
    }
    
    // Migrate profiles (legacy)
    const oldProfiles = localStorage.getItem('tabManagerProfiles');
    if (oldProfiles && !localStorage.getItem(`${APP_VERSION}_tabManagerProfiles`)) {
        localStorage.setItem(`${APP_VERSION}_tabManagerProfiles`, oldProfiles);
        console.log('Migrated profiles to V18 storage');
    }
}