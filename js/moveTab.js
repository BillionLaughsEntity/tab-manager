// js/moveTab.js

// Make sure this function exists globally
function moveTab(tab, destinationEnvironment) {
    console.log('Moving tab:', tab.name, 'to environment:', destinationEnvironment.name);
    
    // Find the current environment and its parent profile/workbook containing the tab
    const { currentEnvironment, sourceWorkbook, sourceProfile } = findEnvironmentContainingTab(tab);
    if (!currentEnvironment) {
        console.error('Could not find current environment for tab');
        return;
    }
    
    // Find the destination workbook and profile
    const { destinationWorkbook, destinationProfile } = findWorkbookAndProfileForEnvironment(destinationEnvironment);
    if (!destinationWorkbook || !destinationProfile) {
        console.error('Could not find destination workbook or profile for environment');
        return;
    }
    
    console.log('Moving from:', sourceWorkbook.name, sourceProfile.name, currentEnvironment.name);
    console.log('Moving to:', destinationWorkbook.name, destinationProfile.name, destinationEnvironment.name);
    
    // Remove tab from current environment
    const tabIndex = currentEnvironment.tabs.findIndex(t => t.id === tab.id);
    if (tabIndex > -1) {
        currentEnvironment.tabs.splice(tabIndex, 1);
        console.log('Removed tab from source environment');
    }
    
    // Add tab to destination environment
    if (!destinationEnvironment.tabs) {
        destinationEnvironment.tabs = [];
    }
    destinationEnvironment.tabs.push(tab);
    console.log('Added tab to destination environment');
    
    // Save and refresh
    saveWorkbooks();
    
    // Refresh the appropriate UI based on whether we moved within the same profile or across profiles
    if (sourceProfile.id === destinationProfile.id) {
        // Same profile - just refresh environments
        renderEnvironments();
    } else {
        // Different profile - might need to refresh more
        renderEnvironments();
        renderProfileTabs();
    }
    
    // If we moved away from the current tab, update the display
    if (currentTab && currentTab.id === tab.id) {
        // The moved tab was the current tab, so clear the current tab
        currentTab = null;
        renderLinks(); // This will show the "no tabs" message
    }
    
    alert(`Tab "${tab.name}" moved successfully to "${destinationEnvironment.name}" in "${destinationProfile.name}" (${destinationWorkbook.name})`);
}

// Enhanced helper function to find environment containing a tab and its parents
function findEnvironmentContainingTab(tab) {
    if (!window.workbooks || !tab) return { currentEnvironment: null, sourceWorkbook: null, sourceProfile: null };
    
    for (const workbook of window.workbooks) {
        for (const profile of workbook.profiles) {
            for (const environment of profile.environments) {
                if (environment.tabs && environment.tabs.some(t => t.id === tab.id)) {
                    return {
                        currentEnvironment: environment,
                        sourceWorkbook: workbook,
                        sourceProfile: profile
                    };
                }
            }
        }
    }
    return { currentEnvironment: null, sourceWorkbook: null, sourceProfile: null };
}

// Helper function to find the workbook and profile for a given environment
function findWorkbookAndProfileForEnvironment(targetEnvironment) {
    if (!window.workbooks || !targetEnvironment) return { destinationWorkbook: null, destinationProfile: null };
    
    for (const workbook of window.workbooks) {
        for (const profile of workbook.profiles) {
            for (const environment of profile.environments) {
                if (environment.id === targetEnvironment.id) {
                    return {
                        destinationWorkbook: workbook,
                        destinationProfile: profile
                    };
                }
            }
        }
    }
    return { destinationWorkbook: null, destinationProfile: null };
}