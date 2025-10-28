// Update your exportToXML function to include trash bin data
function exportToXML() {
    const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
<tabManagerData>
    <workbooks>
        ${workbooks.map(workbook => `
        <workbook id="${workbook.id}" name="${escapeXml(workbook.name)}" color="${workbook.color || '#9b59b6'}">
            <profiles>
                ${(workbook.profiles || []).map(profile => `
                <profile id="${profile.id}" name="${escapeXml(profile.name)}" color="${profile.color || '#3498db'}">
                    <environments>
                        ${(profile.environments || []).map(environment => `
                        <environment id="${environment.id}" name="${escapeXml(environment.name)}">
                            <tabs>
                                ${(environment.tabs || []).map(tab => `
                                <tab id="${tab.id}" name="${escapeXml(tab.name)}">
                                    <links>
                                        ${(tab.links || []).map(link => {
                                            if (link.isMultiLink) {
                                                return `
                                        <link id="${link.id}" type="multi" title="${escapeXml(link.title)}">
                                            ${(link.urls || []).map(url => `
                                            <url>${escapeXml(url)}</url>
                                            `).join('')}
                                        </link>`;
                                            } else if (link.isSearchLink) {
                                                return `
                                        <link id="${link.id}" type="search" title="${escapeXml(link.title)}">
                                            <url>${escapeXml(link.url)}</url>
                                        </link>`;
                                            } else {
                                                return `
                                        <link id="${link.id}" type="single">
                                            <title>${escapeXml(link.title)}</title>
                                            <url>${escapeXml(link.url)}</url>
                                        </link>`;
                                            }
                                        }).join('')}
                                    </links>
                                </tab>
                                `).join('')}
                            </tabs>
                        </environment>
                        `).join('')}
                    </environments>
                </profile>
                `).join('')}
            </profiles>
        </workbook>
        `).join('')}
    </workbooks>
    <trashBin>
        ${trashBin.map(item => `
        <trashItem id="${item.id}" deletedAt="${item.deletedAt}">
            <title>${escapeXml(item.title)}</title>
            <url>${escapeXml(item.url)}</url>
            <origin>
                <workbookId>${item.origin?.workbookId || ''}</workbookId>
                <workbookName>${escapeXml(item.origin?.workbookName || '')}</workbookName>
                <profileId>${item.origin?.profileId || ''}</profileId>
                <profileName>${escapeXml(item.origin?.profileName || '')}</profileName>
                <environmentId>${item.origin?.environmentId || ''}</environmentId>
                <environmentName>${escapeXml(item.origin?.environmentName || '')}</environmentName>
                <tabId>${item.origin?.tabId || ''}</tabId>
                <tabName>${escapeXml(item.origin?.tabName || '')}</tabName>
            </origin>
            ${item.isMultiLink ? `
            <type>multi</type>
            <urls>
                ${(item.urls || []).map(url => `
                <url>${escapeXml(url)}</url>
                `).join('')}
            </urls>
            ` : item.isSearchLink ? `
            <type>search</type>
            ` : `
            <type>single</type>
            `}
        </trashItem>
        `).join('')}
    </trashBin>
</tabManagerData>`;
    
    document.getElementById('export-xml-content').value = xmlData;
    exportModal.style.display = 'flex';
}

// Add this function to handle XML file download
function downloadXMLFile(xmlContent, filename = 'tabmanager_export.xml') {
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}