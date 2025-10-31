// Make sure this function exists globally
function moveTab(tab, destinationEnvironment) {
    console.log('Moving tab:', tab.name, 'to environment:', destinationEnvironment.name);
    
    // Find the current environment containing the tab
    const currentEnvironment = findEnvironmentContainingTab(tab);
    if (!currentEnvironment) {
        console.error('Could not find current environment for tab');
        return;
    }
    
    // Remove tab from current environment
    const tabIndex = currentEnvironment.tabs.findIndex(t => t.id === tab.id);
    if (tabIndex > -1) {
        currentEnvironment.tabs.splice(tabIndex, 1);
    }
    
    // Add tab to destination environment
    if (!destinationEnvironment.tabs) {
        destinationEnvironment.tabs = [];
    }
    destinationEnvironment.tabs.push(tab);
    
    // Save and refresh
    saveWorkbooks();
    renderEnvironments();
    
    alert(`Tab "${tab.name}" moved successfully to "${destinationEnvironment.name}"`);
}

// Helper function to find environment containing a tab
function findEnvironmentContainingTab(tab) {
    for (const workbook of workbooks) {
        for (const profile of workbook.profiles) {
            for (const environment of profile.environments) {
                if (environment.tabs && environment.tabs.some(t => t.id === tab.id)) {
                    return environment;
                }
            }
        }
    }
    return null;
}