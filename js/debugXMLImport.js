function debugXMLImport(xmlContent) {
    console.log('=== XML Import Debug ===');
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
    
    // Check what the XML contains
    const workbooksElement = xmlDoc.getElementsByTagName('workbooks')[0];
    if (workbooksElement) {
        console.log('Found workbooks in XML');
        const workbookElements = workbooksElement.getElementsByTagName('workbook');
        console.log(`Number of workbooks: ${workbookElements.length}`);
        
        for (let i = 0; i < workbookElements.length; i++) {
            const workbook = workbookElements[i];
            console.log(`Workbook ${i + 1}:`, workbook.getAttribute('name'));
        }
    } else {
        console.log('No workbooks found in XML');
    }
    
    console.log('=== End Debug ===');
}