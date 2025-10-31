// js/moveTab.js

// Make sure this function exists globally
function moveTab(tab, destinationEnvironment) {
    console.log('Moving tab:', tab.name, 'to environment:', destinationEnvironment.name);
    
    // Get workbooks data
    const workbooks = getWorkbooksDataForMove();
    if (!workbooks) {
        console.error('No workbooks data found for move operation');
        alert('Error: Could not access workbooks data');
        return;
    }
    
    // Find the current environment and its parent profile/workbook containing the tab
    const { currentEnvironment, sourceWorkbook, sourceProfile } = findEnvironmentContainingTab(tab, workbooks);
    if (!currentEnvironment) {
        console.error('Could not find current environment for tab');
        alert('Error: Could not find source environment for tab');
        return;
    }
    
    // Find the destination workbook and profile
    const { destinationWorkbook, destinationProfile } = findWorkbookAndProfileForEnvironment(destinationEnvironment, workbooks);
    if (!destinationWorkbook || !destinationProfile) {
        console.error('Could not find destination workbook or profile for environment');
        alert('Error: Could not find destination for environment');
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
    
    // Refresh the appropriate UI
    renderEnvironments();
    renderProfileTabs();
    
    // If we moved away from the current tab, update the display
    if (currentTab && currentTab.id === tab.id) {
        // The moved tab was the current tab, so clear the current tab
        currentTab = null;
        renderLinks(); // This will show the "no tabs" message
    }
    
    alert(`Tab "${tab.name}" moved successfully to "${destinationEnvironment.name}" in "${destinationProfile.name}" (${destinationWorkbook.name})`);
}

// Helper function to get workbooks data for move operations
function getWorkbooksDataForMove() {
    // Try multiple sources
    if (window.workbooks && Array.isArray(window.workbooks)) {
        return window.workbooks;
    }
    
    // Try localStorage
    try {
        const versionedData = localStorage.getItem('tabManagerData_v18-search');
        if (versionedData) {
            const parsed = JSON.parse(versionedData);
            return parsed.workbooks;
        }
    } catch (e) {
        console.error('Error reading workbooks from localStorage:', e);
    }
    
    return null;
}

// Enhanced helper function to find environment containing a tab and its parents
function findEnvironmentContainingTab(tab, workbooks) {
    if (!workbooks || !tab) return { currentEnvironment: null, sourceWorkbook: null, sourceProfile: null };
    
    for (const workbook of workbooks) {
        for (const profile of workbook.profiles) {
            if (profile.environments && Array.isArray(profile.environments)) {
                for (const environment of profile.environments) {
                    if (environment.tabs && Array.isArray(environment.tabs)) {
                        const foundTab = environment.tabs.find(t => t.id === tab.id);
                        if (foundTab) {
                            return {
                                currentEnvironment: environment,
                                sourceWorkbook: workbook,
                                sourceProfile: profile
                            };
                        }
                    }
                }
            }
        }
    }
    return { currentEnvironment: null, sourceWorkbook: null, sourceProfile: null };
}

// Helper function to find the workbook and profile for a given environment
function findWorkbookAndProfileForEnvironment(targetEnvironment, workbooks) {
    if (!workbooks || !targetEnvironment) return { destinationWorkbook: null, destinationProfile: null };
    
    for (const workbook of workbooks) {
        for (const profile of workbook.profiles) {
            if (profile.environments && Array.isArray(profile.environments)) {
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
    }
    return { destinationWorkbook: null, destinationProfile: null };
}