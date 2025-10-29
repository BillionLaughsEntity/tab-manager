// Helper function to import environments
function importEnvironments(environmentsElement) {
    const environments = [];
    const environmentElements = environmentsElement.getElementsByTagName('environment');
    
    for (let j = 0; j < environmentElements.length; j++) {
        const environmentElement = environmentElements[j];
        const environment = {
            id: environmentElement.getAttribute('id') || 'env-' + Date.now() + j,
            name: environmentElement.getAttribute('name') || 'Imported Environment ' + (j + 1),
            tabs: []
        };
        
        const tabsElement = environmentElement.getElementsByTagName('tabs')[0];
        if (tabsElement) {
            environment.tabs = importTabs(tabsElement);
        }
        
        environments.push(environment);
    }
    
    return environments;
}