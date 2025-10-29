// Create a default workbook with sample data
function createDefaultWorkbook() {
    const defaultWorkbook = {
        id: 'workbook-' + Date.now(),
        name: 'Default Workbook',
        color: '#9b59b6',
        profiles: [{
            id: 'profile-' + Date.now(),
            name: 'Default Profile',
            color: '#3498db',
            environments: [{
                id: 'env-' + Date.now(),
                name: 'General',
                tabs: [{
                    id: 'tab-' + Date.now(),
                    name: 'Main',
                    links: [{
                        id: 'link-' + Date.now(),
                        title: 'Google',
                        url: 'https://www.google.com'
                    }]
                }]
            }]
        }]
    };

    workbooks.push(defaultWorkbook);
    currentWorkbookId = defaultWorkbook.id;
    currentProfileId = defaultWorkbook.profiles[0].id;
    saveWorkbooks();
}