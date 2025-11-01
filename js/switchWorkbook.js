// In switchWorkbook.js - ensure this function is accessible globally
function switchWorkbook(workbookId) {
    currentWorkbookId = workbookId;
    
    // Use getCurrentWorkbook() instead of currentWorkbook variable
    const currentWorkbook = getCurrentWorkbook();
    if (!currentWorkbook) return;
    
    // Auto-select the first profile in the workbook
    if (currentWorkbook.profiles && currentWorkbook.profiles.length > 0) {
        currentProfileId = currentWorkbook.profiles[0].id;
        currentEnvironment = null;
        currentTab = null;
    } else {
        currentProfileId = null;
        currentEnvironment = null;
        currentTab = null;
    }
    
    // Clear the links display
    clearLinksDisplay();
    
    renderProfileTabs();
    renderEnvironments();
    updateAllCounters();
    saveWorkbooks();
}

// Make this function globally accessible
window.clearLinksDisplay = function() {
    const linksGrid = document.getElementById('links-grid');
    const noTabsMessage = document.getElementById('no-tabs-message');
    const currentTabName = document.getElementById('current-tab-name');
    const addLinkSection = document.getElementById('add-link-section');
    
    if (linksGrid) {
        linksGrid.innerHTML = '';
        linksGrid.style.display = 'none';
    }
    
    if (noTabsMessage) {
        noTabsMessage.style.display = 'block';
    }
    
    if (currentTabName) {
        currentTabName.textContent = 'Select a tab to get started';
    }
    
    if (addLinkSection) {
        addLinkSection.style.display = 'none';
    }
    
    // Also hide any selection mode and bulk actions
    if (isSelectionMode && typeof toggleSelectionMode === 'function') {
        toggleSelectionMode();
    }
    
    // Hide bulk action bar if visible
    const bulkActionBar = document.getElementById('bulk-action-bar');
    if (bulkActionBar) {
        bulkActionBar.style.display = 'none';
    }
    
    // Clear any selected links
    if (selectedLinks) {
        selectedLinks.clear();
    }
};