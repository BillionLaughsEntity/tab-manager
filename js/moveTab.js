// Fix moveTab function to handle cross-workbook/profile moves
function moveTab(tab, destinationEnvironment) {
    console.log('Moving tab:', tab.name, 'to environment:', destinationEnvironment.name, 'in profile:', selectedDestinationProfile.name);
    
    // Remove tab from current environment
    const tabIndex = currentEnvironment.tabs.findIndex(t => t.id === tab.id);
    if (tabIndex === -1) {
        console.error('Tab not found in current environment');
        return;
    }
    
    const [movedTab] = currentEnvironment.tabs.splice(tabIndex, 1);
    
    // Add tab to destination environment
    if (!destinationEnvironment.tabs) {
        destinationEnvironment.tabs = [];
    }
    destinationEnvironment.tabs.push(movedTab);
    
    saveWorkbooks();
    renderEnvironments();
    
    // If the moved tab was selected, update the display
    if (currentTab === tab) {
        // Switch to the destination environment and tab
        currentEnvironment = destinationEnvironment;
        currentTab = movedTab;
        currentProfileId = selectedDestinationProfile.id;
        
        // Update UI
        renderProfileTabs();
        renderEnvironments();
        selectTab(destinationEnvironment, movedTab);
    }
    
    // Show success message
    alert(`Tab "${movedTab.name}" moved successfully to "${destinationEnvironment.name}" in "${selectedDestinationProfile.name}"`);
}