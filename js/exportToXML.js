function openExportModal() {

    // Debug: Check data structure
    console.log('Workbooks:', workbooks);
    console.log('TrashBin:', trashBin);
    
    // Check for null items in workbooks
    if (workbooks) {
        workbooks.forEach((workbook, index) => {
            if (!workbook) {
                console.error(`Workbook at index ${index} is null`);
            } else {
                console.log(`Workbook ${index}:`, workbook);
                // Check profiles
                (workbook.profiles || []).forEach((profile, pIndex) => {
                    if (!profile) console.error(`Profile ${pIndex} in workbook ${index} is null`);
                });
            }
        });
    }

    
    console.log('openExportModal called');
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
    // Add null checks for main data structures
    if (!workbooks) {
        console.error('workbooks is null or undefined');
        workbooks = [];
    }
    
    if (!trashBin) {
        console.error('trashBin is null or undefined');
        trashBin = [];
    }

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<TabManagerData>\n';
    xml += '  <Version>' + escapeXml(APP_VERSION) + '</Version>\n';
    xml += '  <ExportDate>' + new Date().toISOString() + '</ExportDate>\n';
    
    // Export Workbooks with null checks
    xml += '  <Workbooks>\n';
    (workbooks || []).forEach(workbook => {
        // Skip if workbook is null
        if (!workbook) return;
        
        xml += '    <Workbook>\n';
        xml += '      <Id>' + escapeXml(workbook.id) + '</Id>\n';
        xml += '      <Name>' + escapeXml(workbook.name) + '</Name>\n';
        xml += '      <Color>' + escapeXml(workbook.color || '#9b59b6') + '</Color>\n';
        
        // Export Profiles with null checks
        xml += '      <Profiles>\n';
        (workbook.profiles || []).forEach(profile => {
            // Skip if profile is null
            if (!profile) return;
            
            xml += '        <Profile>\n';
            xml += '          <Id>' + escapeXml(profile.id) + '</Id>\n';
            xml += '          <Name>' + escapeXml(profile.name) + '</Name>\n';
            xml += '          <Color>' + escapeXml(profile.color || '#3498db') + '</Color>\n';
            
            // Export Environments with null checks
            xml += '          <Environments>\n';
            (profile.environments || []).forEach(environment => {
                // Skip if environment is null
                if (!environment) return;
                
                xml += '            <Environment>\n';
                xml += '              <Id>' + escapeXml(environment.id) + '</Id>\n';
                xml += '              <Name>' + escapeXml(environment.name) + '</Name>\n';
                
                // Export Tabs with null checks
                xml += '              <Tabs>\n';
                (environment.tabs || []).forEach(tab => {
                    // Skip if tab is null
                    if (!tab) return;
                    
                    xml += '                <Tab>\n';
                    xml += '                  <Id>' + escapeXml(tab.id) + '</Id>\n';
                    xml += '                  <Name>' + escapeXml(tab.name) + '</Name>\n';
                    
                    // Export Links with null checks
                    xml += '                  <Links>\n';
                    (tab.links || []).forEach(link => {
                        // Skip if link is null
                        if (!link) return;
                        
                        xml += '                    <Link>\n';
                        xml += '                      <Id>' + escapeXml(link.id) + '</Id>\n';
                        xml += '                      <Title>' + escapeXml(link.title) + '</Title>\n';
                        xml += '                      <Url>' + escapeXml(link.url) + '</Url>\n';
                        xml += '                      <Type>' + escapeXml(link.type || 'regular') + '</Type>\n';
                        
                        // Export multi-link data if it exists
                        if (link.type === 'multi' && link.links) {
                            xml += '                      <MultiLinks>\n';
                            (link.links || []).forEach(multiLink => {
                                // Skip if multiLink is null
                                if (!multiLink) return;
                                
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
    
    // Export Trash Bin with null checks
    xml += '  <TrashBin>\n';
    (trashBin || []).forEach(item => {
        // Skip if item is null
        if (!item) return;
        
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

function downloadXMLFile(xmlContent, filename) {
    // If no xmlContent provided, generate it
    if (!xmlContent) {
        xmlContent = exportToXML();
    }
    
    // If no filename provided, generate a default one
    if (!filename) {
        filename = `tab-manager-backup-${new Date().toISOString().split('T')[0]}.xml`;
    }
    
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary download link
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    
    // Trigger the download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function escapeXml(unsafe) {
    if (unsafe === null || unsafe === undefined) return '';
    return unsafe.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}