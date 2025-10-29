// Add moveProfile function
function moveProfile(profile, destinationWorkbook) {
    console.log('Moving profile:', profile.name, 'to workbook:', destinationWorkbook.name);
    
    const currentWorkbook = getCurrentWorkbook();
    
    // Remove profile from current workbook
    currentWorkbook.profiles = currentWorkbook.profiles.filter(p => p.id !== profile.id);
    
    // Add profile to destination workbook
    if (!destinationWorkbook.profiles) {
        destinationWorkbook.profiles = [];
    }
    destinationWorkbook.profiles.push(profile);
    
    saveWorkbooks();
    renderWorkbookTabs();
    renderProfileTabs();
    
    // If the moved profile was current, switch to first profile in current workbook
    if (currentProfileId === profile.id) {
        if (currentWorkbook.profiles.length > 0) {
            currentProfileId = currentWorkbook.profiles[0].id;
            renderEnvironments();
        } else {
            currentProfileId = null;
            currentEnvironment = null;
            currentTab = null;
            noTabsMessage.style.display = 'block';
            linksGrid.style.display = 'none';
            addLinkSection.style.display = 'none';
            reorderLinksBtn.style.display = 'none';
            currentTabName.textContent = 'Select a tab to get started';
        }
    }
    
    // Show success message
    alert(`Profile "${profile.name}" moved successfully to "${destinationWorkbook.name}"`);
}