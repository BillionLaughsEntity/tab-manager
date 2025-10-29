// Switch to a different profile
function switchProfile(profileId) {
    currentProfileId = profileId;
    currentEnvironment = null;
    currentTab = null;
    
    // Update UI
    renderEnvironments();
    noTabsMessage.style.display = 'block';
    linksGrid.style.display = 'none';
    addLinkSection.style.display = 'none';
    reorderLinksBtn.style.display = 'none';
    document.getElementById('add-multi-link-card-btn').style.display = 'none';
    document.getElementById('create-search-link-btn').style.display = 'none';
    document.getElementById('toggle-selection-mode-btn').style.display = 'none';
    currentTabName.textContent = 'Select a tab to get started';
    
    // Update active profile tab
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.profileId === profileId) {
            tab.classList.add('active');
        }
    });
}