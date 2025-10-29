// Switch to a different workbook
function switchWorkbook(workbookId) {
    currentWorkbookId = workbookId;
    currentProfileId = null;
    currentEnvironment = null;
    currentTab = null;
    
    // Update UI
    renderProfileTabs(); // This now shows only current workbook's profiles
    renderEnvironments();
    noTabsMessage.style.display = 'block';
    linksGrid.style.display = 'none';
    addLinkSection.style.display = 'none';
    reorderLinksBtn.style.display = 'none';
    currentTabName.textContent = 'Select a tab to get started';
    
    // Update active workbook tab
    document.querySelectorAll('.workbook-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.workbookId === workbookId) {
            tab.classList.add('active');
        }
    });
    
    // Set the current profile to the first one in the NEW workbook
    const currentWorkbook = getCurrentWorkbook();
    if (currentWorkbook.profiles.length > 0) {
        currentProfileId = currentWorkbook.profiles[0].id;
        renderEnvironments();
    }
}