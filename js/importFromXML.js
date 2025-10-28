// Import data from XML (updated for multi-link cards and trash bin)
function importFromXML(xmlContent) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
        
        // Check for parsing errors
        if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
            throw new Error('Invalid XML format');
        }
        
        const profilesElement = xmlDoc.getElementsByTagName('profiles')[0];
        if (!profilesElement) {
            throw new Error('No profiles found in XML');
        }
        
        // Import profiles
        profiles = importProfiles(profilesElement);
        saveWorkbooks();
        
        // Import trash bin data
        const trashBinElement = xmlDoc.getElementsByTagName('trashBin')[0];
        if (trashBinElement) {
            trashBin = importTrashBin(trashBinElement);
            saveTrashBin();
        }
        
        // Update UI
        renderProfileTabs();
        renderEnvironments();
        
        // Set current profile to the first one
        if (profiles.length > 0) {
            currentProfileId = profiles[0].id;
        }
        
        importModal.style.display = 'none';
        alert('Data imported successfully!');
    } catch (error) {
        alert('Error importing XML: ' + error.message);
        console.error('Import error:', error);
    }
}