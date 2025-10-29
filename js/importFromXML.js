function importFromXML(xmlString) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        
        // Check for parsing errors
        const parseError = xmlDoc.getElementsByTagName('parsererror');
        if (parseError.length > 0) {
            throw new Error('Invalid XML format: ' + parseError[0].textContent);
        }
        
        const importedWorkbooks = [];
        const importedTrashBin = [];
        
        // Import Workbooks
        const workbooksElements = xmlDoc.getElementsByTagName('Workbook');
        for (let i = 0; i < workbooksElements.length; i++) {
            const workbookElement = workbooksElements[i];
            const workbook = {
                id: getElementText(workbookElement, 'Id') || generateId(),
                name: getElementText(workbookElement, 'Name') || 'Imported Workbook',
                color: getElementText(workbookElement, 'Color') || '#9b59b6',
                profiles: []
            };
            
            // Import Profiles
            const profilesElement = workbookElement.getElementsByTagName('Profiles')[0];
            if (profilesElement) {
                const profileElements = profilesElement.getElementsByTagName('Profile');
                for (let j = 0; j < profileElements.length; j++) {
                    const profileElement = profileElements[j];
                    const profile = {
                        id: getElementText(profileElement, 'Id') || generateId(),
                        name: getElementText(profileElement, 'Name') || 'Imported Profile',
                        color: getElementText(profileElement, 'Color') || '#3498db',
                        environments: []
                    };
                    
                    // Import Environments
                    const environmentsElement = profileElement.getElementsByTagName('Environments')[0];
                    if (environmentsElement) {
                        const environmentElements = environmentsElement.getElementsByTagName('Environment');
                        for (let k = 0; k < environmentElements.length; k++) {
                            const environmentElement = environmentElements[k];
                            const environment = {
                                id: getElementText(environmentElement, 'Id') || generateId(),
                                name: getElementText(environmentElement, 'Name') || 'Imported Environment',
                                tabs: []
                            };
                            
                            // Import Tabs
                            const tabsElement = environmentElement.getElementsByTagName('Tabs')[0];
                            if (tabsElement) {
                                const tabElements = tabsElement.getElementsByTagName('Tab');
                                for (let l = 0; l < tabElements.length; l++) {
                                    const tabElement = tabElements[l];
                                    const tab = {
                                        id: getElementText(tabElement, 'Id') || generateId(),
                                        name: getElementText(tabElement, 'Name') || 'Imported Tab',
                                        links: []
                                    };
                                    
                                    // Import Links
                                    const linksElement = tabElement.getElementsByTagName('Links')[0];
                                    if (linksElement) {
                                        const linkElements = linksElement.getElementsByTagName('Link');
                                        for (let m = 0; m < linkElements.length; m++) {
                                            const linkElement = linkElements[m];
                                            const linkType = getElementText(linkElement, 'Type') || 'regular';
                                            
                                            const link = {
                                                id: getElementText(linkElement, 'Id') || generateId(),
                                                title: getElementText(linkElement, 'Title') || 'Imported Link',
                                                url: getElementText(linkElement, 'Url') || '',
                                                type: linkType
                                            };
                                            
                                            // Import multi-link data if it exists
                                            if (linkType === 'multi') {
                                                const multiLinksElement = linkElement.getElementsByTagName('MultiLinks')[0];
                                                if (multiLinksElement) {
                                                    link.links = [];
                                                    const multiLinkElements = multiLinksElement.getElementsByTagName('MultiLink');
                                                    for (let n = 0; n < multiLinkElements.length; n++) {
                                                        const multiLinkElement = multiLinkElements[n];
                                                        link.links.push({
                                                            title: getElementText(multiLinkElement, 'Title') || 'Multi Link',
                                                            url: getElementText(multiLinkElement, 'Url') || ''
                                                        });
                                                    }
                                                }
                                            }
                                            
                                            // Handle email links (they should already have type 'email')
                                            if (link.url.startsWith('mailto:')) {
                                                link.type = 'email';
                                            }
                                            
                                            tab.links.push(link);
                                        }
                                    }
                                    
                                    environment.tabs.push(tab);
                                }
                            }
                            
                            profile.environments.push(environment);
                        }
                    }
                    
                    workbook.profiles.push(profile);
                }
            }
            
            importedWorkbooks.push(workbook);
        }
        
        // Import Trash Bin
        const trashBinElement = xmlDoc.getElementsByTagName('TrashBin')[0];
        if (trashBinElement) {
            const trashItemElements = trashBinElement.getElementsByTagName('TrashItem');
            for (let i = 0; i < trashItemElements.length; i++) {
                const trashItemElement = trashItemElements[i];
                const trashItem = {
                    id: getElementText(trashItemElement, 'Id') || generateId(),
                    type: getElementText(trashItemElement, 'Type') || 'link',
                    data: JSON.parse(getElementText(trashItemElement, 'Data') || '{}'),
                    deletedAt: getElementText(trashItemElement, 'DeletedAt') || new Date().toISOString()
                };
                importedTrashBin.push(trashItem);
            }
        }
        
        return {
            workbooks: importedWorkbooks,
            trashBin: importedTrashBin
        };
        
    } catch (error) {
        console.error('Error importing XML:', error);
        throw new Error('Failed to import XML: ' + error.message);
    }
}

// Helper function to get text content from XML element
function getElementText(parentElement, tagName) {
    const elements = parentElement.getElementsByTagName(tagName);
    if (elements.length > 0 && elements[0].textContent) {
        return elements[0].textContent.trim();
    }
    return '';
}

// Helper function to generate IDs for imported items
function generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}