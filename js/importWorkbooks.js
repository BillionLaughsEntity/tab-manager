// Import workbooks from XML
function importWorkbooks(workbooksElement) {
    const importedWorkbooks = [];
    const workbookElements = workbooksElement.getElementsByTagName('workbook');
    
    for (let workbookElem of workbookElements) {
        const workbook = {
            id: workbookElem.getAttribute('id') || 'workbook-' + Date.now(),
            name: workbookElem.getAttribute('name') || 'Imported Workbook',
            color: workbookElem.getAttribute('color') || '#9b59b6',
            profiles: []
        };
        
        // Import profiles for this workbook
        const profilesElem = workbookElem.getElementsByTagName('profiles')[0];
        if (profilesElem) {
            workbook.profiles = importProfiles(profilesElem);
        }
        
        importedWorkbooks.push(workbook);
    }
    
    return importedWorkbooks;
}

// Convert old profiles structure to workbooks (for backward compatibility)
function convertProfilesToWorkbooks(profilesElement) {
    const workbook = {
        id: 'workbook-' + Date.now(),
        name: 'Migrated Workbook',
        color: '#9b59b6',
        profiles: importProfiles(profilesElement)
    };
    
    return [workbook];
}