// Switch to a different workbook - FIXED VERSION
function switchWorkbook(workbookId) {
    console.log('=== SWITCH WORKBOOK DEBUG ===');
    console.log('Switching to workbook:', workbookId);
    
    currentWorkbookId = workbookId;
    currentEnvironment = null;
    currentTab = null;
    
    // Get the new current workbook
    const currentWorkbook = getCurrentWorkbook();
    console.log('Current workbook:', currentWorkbook);
    
    // Set the current profile to the first one in the NEW workbook
    if (currentWorkbook && currentWorkbook.profiles.length > 0) {
        currentProfileId = currentWorkbook.profiles[0].id;
        console.log('Set current profile to:', currentProfileId);
    } else {
        currentProfileId = null;
        console.log('No profiles in workbook, setting currentProfileId to null');
    }
    
    // Update UI
    renderProfileTabs();
    
    // Only render environments if we have a current profile
    if (currentProfileId) {
        renderEnvironments();
    } else {
        // Clear environments container
        const environmentsContainer = document.getElementById('environments-container');
        if (environmentsContainer) {
            environmentsContainer.innerHTML = '<div class="no-environments">No profiles available. Create a profile first.</div>';
        }
    }
    
    // Update active workbook tab
    document.querySelectorAll('.workbook-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.workbookId === workbookId) {
            tab.classList.add('active');
        }
    });
    
    // Clear links display
    noTabsMessage.style.display = 'block';
    linksGrid.style.display = 'none';
    addLinkSection.style.display = 'none';
    reorderLinksBtn.style.display = 'none';
    currentTabName.textContent = 'Select a tab to get started';
    
    console.log('Workbook switch completed');
}