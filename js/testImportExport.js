// Temporary test function
function testImportExport() {
    console.log('=== TESTING IMPORT/EXPORT ===');
    console.log('Current workbooks:', workbooks);
    
    // Export current data
    const xml = exportToXML();
    console.log('Exported XML:', xml);
    
    // Try to import it back
    try {
        importFromXML(xml);
        console.log('Import/Export test: SUCCESS');
    } catch (error) {
        console.error('Import/Export test: FAILED', error);
    }
}
