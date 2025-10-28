// Import data from XML (updated for workbooks structure)
function importFromXML(xmlContent) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
        
        // Check for parsing errors
        if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
            throw new Error('Invalid XML format');
        }
        
        // Try to import workbooks first (new structure)
        const workbooksElement = xmlDoc.getElementsByTagName('workbooks')[0];
        if (workbooksElement) {
            workbooks = importWorkbooks(workbooksElement);
        } 
        // Fallback to old profiles structure for backward compatibility
        else {
            const profilesElement = xmlDoc.getElementsByTagName('profiles')[0];
            if (!profilesElement) {
                throw new Error('No workbooks or profiles found in XML');
            }
            // Convert old profiles structure to workbooks
            workbooks = convertProfilesToWorkbooks(profilesElement);
        }
        
        saveWorkbooks();
        
        // Import trash bin data
        const trashBinElement = xmlDoc.getElementsByTagName('trashBin')[0];
        if (trashBinElement) {
            trashBin = importTrashBin(trashBinElement);
            saveTrashBin();
        }
        
        // Update UI
        renderWorkbookTabs();
        renderProfileTabs();
        renderEnvironments();
        
        // Set current selections
        if (workbooks.length > 0) {
            currentWorkbookId = workbooks[0].id;
            const currentWorkbook = getCurrentWorkbook();
            if (currentWorkbook.profiles.length > 0) {
                currentProfileId = currentWorkbook.profiles[0].id;
            }
        }
        
        importModal.style.display = 'none';
        alert('Data imported successfully!');
        
        // Update counters
        if (typeof updateAllCounters === 'function') {
            updateAllCounters();
        }
        
    } catch (error) {
        alert('Error importing XML: ' + error.message);
        console.error('Import error:', error);
    }
}