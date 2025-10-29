function openExportModal() {
    console.log('openExportModal called'); // Debug log
    const modal = document.getElementById('export-modal');
    if (!modal) {
        console.error('Export modal not found!');
        return;
    }
    
    // Generate XML content
    const xmlContent = exportToXML();
    
    // Display in textarea
    const exportTextarea = document.getElementById('export-xml-content');
    if (exportTextarea) {
        exportTextarea.value = xmlContent;
    }
    
    // Show modal
    modal.style.display = 'block';
    console.log('Export modal should be visible now');
}

function exportToXML() {
    const data = {
        workbooks: workbooks,
        trashBin: trashBin,
        version: APP_VERSION,
        exportDate: new Date().toISOString()
    };

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<TabManagerData>\n';
    xml += '  <Version>' + APP_VERSION + '</Version>\n';
    xml += '  <ExportDate>' + new Date().toISOString() + '</ExportDate>\n';
    
    // Export Workbooks
    xml += '  <Workbooks>\n';
    workbooks.forEach(workbook => {
        xml += '    <Workbook>\n';
        xml += '      <Id>' + escapeXml(workbook.id) + '</Id>\n';
        xml += '      <Name>' + escapeXml(workbook.name) + '</Name>\n';
        xml += '      <Color>' + escapeXml(workbook.color || '#9b59b6') + '</Color>\n';
        
        // Export Profiles
        xml += '      <Profiles>\n';
        workbook.profiles.forEach(profile => {
            xml += '        <Profile>\n';
            xml += '          <Id>' + escapeXml(profile.id) + '</Id>\n';
            xml += '          <Name>' + escapeXml(profile.name) + '</Name>\n';
            xml += '          <Color>' + escapeXml(profile.color || '#3498db') + '</Color>\n';
            
            // Export Environments
            xml += '          <Environments>\n';
            profile.environments.forEach(environment => {
                xml += '            <Environment>\n';
                xml += '              <Id>' + escapeXml(environment.id) + '</Id>\n';
                xml += '              <Name>' + escapeXml(environment.name) + '</Name>\n';
                
                // Export Tabs
                xml += '              <Tabs>\n';
                environment.tabs.forEach(tab => {
                    xml += '                <Tab>\n';
                    xml += '                  <Id>' + escapeXml(tab.id) + '</Id>\n';
                    xml += '                  <Name>' + escapeXml(tab.name) + '</Name>\n';
                    
                    // Export Links
                    xml += '                  <Links>\n';
                    tab.links.forEach(link => {
                        xml += '                    <Link>\n';
                        xml += '                      <Id>' + escapeXml(link.id) + '</Id>\n';
                        xml += '                      <Title>' + escapeXml(link.title) + '</Title>\n';
                        xml += '                      <Url>' + escapeXml(link.url) + '</Url>\n';
                        xml += '                      <Type>' + escapeXml(link.type || 'regular') + '</Type>\n';
                        
                        // Export multi-link data if it exists
                        if (link.type === 'multi' && link.links) {
                            xml += '                      <MultiLinks>\n';
                            link.links.forEach(multiLink => {
                                xml += '                        <MultiLink>\n';
                                xml += '                          <Title>' + escapeXml(multiLink.title) + '</Title>\n';
                                xml += '                          <Url>' + escapeXml(multiLink.url) + '</Url>\n';
                                xml += '                        </MultiLink>\n';
                            });
                            xml += '                      </MultiLinks>\n';
                        }
                        
                        xml += '                    </Link>\n';
                    });
                    xml += '                  </Links>\n';
                    xml += '                </Tab>\n';
                });
                xml += '              </Tabs>\n';
                xml += '            </Environment>\n';
            });
            xml += '          </Environments>\n';
            xml += '        </Profile>\n';
        });
        xml += '      </Profiles>\n';
        xml += '    </Workbook>\n';
    });
    xml += '  </Workbooks>\n';
    
    // Export Trash Bin
    xml += '  <TrashBin>\n';
    trashBin.forEach(item => {
        xml += '    <TrashItem>\n';
        xml += '      <Id>' + escapeXml(item.id) + '</Id>\n';
        xml += '      <Type>' + escapeXml(item.type) + '</Type>\n';
        xml += '      <Data>' + escapeXml(JSON.stringify(item.data)) + '</Data>\n';
        xml += '      <DeletedAt>' + escapeXml(item.deletedAt) + '</DeletedAt>\n';
        xml += '    </TrashItem>\n';
    });
    xml += '  </TrashBin>\n';
    
    xml += '</TabManagerData>';
    
    return xml;
}


// Add this function to exportToXML.js
function downloadXMLFile() {
    const xmlContent = exportToXML();
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `tab-manager-backup-${new Date().toISOString().split('T')[0]}.xml`;
    
    // Trigger the download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Make sure escapeXml function exists (add it if missing)
function escapeXml(unsafe) {
    if (unsafe === null || unsafe === undefined) return '';
    return unsafe.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}