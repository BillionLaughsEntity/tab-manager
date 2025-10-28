// Export to XML (updated for workbooks)
function exportToXML() {
    const serializer = new XMLSerializer();
    
    // Create root element
    const root = document.createElement('tabManagerData');
    root.setAttribute('version', APP_VERSION);
    root.setAttribute('exportDate', new Date().toISOString());
    
    // Add workbooks
    const workbooksElem = document.createElement('workbooks');
    workbooks.forEach(workbook => {
        const workbookElem = document.createElement('workbook');
        workbookElem.setAttribute('id', workbook.id);
        workbookElem.setAttribute('name', workbook.name);
        workbookElem.setAttribute('color', workbook.color);
        
        // Add profiles for this workbook
        const profilesElem = document.createElement('profiles');
        workbook.profiles.forEach(profile => {
            const profileElem = document.createElement('profile');
            profileElem.setAttribute('id', profile.id);
            profileElem.setAttribute('name', profile.name);
            profileElem.setAttribute('color', profile.color);
            
            // Add environments
            const environmentsElem = document.createElement('environments');
            profile.environments.forEach(environment => {
                const environmentElem = document.createElement('environment');
                environmentElem.setAttribute('id', environment.id);
                environmentElem.setAttribute('name', environment.name);
                
                // Add tabs
                const tabsElem = document.createElement('tabs');
                environment.tabs.forEach(tab => {
                    const tabElem = document.createElement('tab');
                    tabElem.setAttribute('id', tab.id);
                    tabElem.setAttribute('name', tab.name);
                    
                    // Add links
                    const linksElem = document.createElement('links');
                    tab.links.forEach(link => {
                        const linkElem = document.createElement('link');
                        linkElem.setAttribute('id', link.id);
                        linkElem.setAttribute('title', escapeXml(link.title));
                        linkElem.setAttribute('url', escapeXml(link.url));
                        if (link.type === 'multi') {
                            linkElem.setAttribute('type', 'multi');
                            link.multiLinks.forEach(multiLink => {
                                const multiLinkElem = document.createElement('multiLink');
                                multiLinkElem.setAttribute('url', escapeXml(multiLink));
                                linkElem.appendChild(multiLinkElem);
                            });
                        }
                        linksElem.appendChild(linkElem);
                    });
                    
                    tabElem.appendChild(linksElem);
                    tabsElem.appendChild(tabElem);
                });
                
                environmentElem.appendChild(tabsElem);
                environmentsElem.appendChild(environmentElem);
            });
            
            profileElem.appendChild(environmentsElem);
            profilesElem.appendChild(profileElem);
        });
        
        workbookElem.appendChild(profilesElem);
        workbooksElem.appendChild(workbookElem);
    });
    
    root.appendChild(workbooksElem);
    
    // Add trash bin if not empty
    if (trashBin.length > 0) {
        const trashBinElem = document.createElement('trashBin');
        trashBin.forEach(item => {
            const itemElem = document.createElement('trashItem');
            itemElem.setAttribute('id', item.id);
            itemElem.setAttribute('type', item.type);
            itemElem.setAttribute('data', escapeXml(JSON.stringify(item.data)));
            itemElem.setAttribute('deletedAt', item.deletedAt);
            trashBinElem.appendChild(itemElem);
        });
        root.appendChild(trashBinElem);
    }
    
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + serializer.serializeToString(root);
}