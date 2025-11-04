function renderProfileTabs() {
    // ... (same setup code as above)
    
    // Remove individual button handlers and use event delegation instead
    profileTabsContainer.addEventListener('click', handleProfileTabClick);
}

function handleProfileTabClick(e) {
    const actionBtn = e.target.closest('.profile-tab-action-btn');
    const profileTab = e.target.closest('.profile-tab');
    
    if (!profileTab) return;
    
    const profileId = profileTab.dataset.profileId;
    const currentWorkbook = getCurrentWorkbook();
    const profile = currentWorkbook.profiles.find(p => p.id === profileId);
    
    if (!profile) return;
    
    if (actionBtn) {
        e.stopPropagation();
        const action = actionBtn.classList[1].replace('profile-', '').replace('-btn', '');
        
        switch(action) {
            case 'move':
                if (typeof openMoveProfileModal === 'function') openMoveProfileModal(profile);
                break;
            case 'color':
                if (typeof openProfileColorModal === 'function') openProfileColorModal(profile);
                break;
            case 'rename':
                if (typeof openRenameProfileModal === 'function') openRenameProfileModal(profile);
                break;
            case 'delete':
                if (typeof deleteProfile === 'function' && confirm(`Delete "${profile.name}"?`)) {
                    deleteProfile(profile.id);
                }
                break;
        }
    } else {
        // Clicked on tab itself (not action buttons)
        if (typeof switchProfile === 'function') {
            switchProfile(profile.id);
        }
    }
}