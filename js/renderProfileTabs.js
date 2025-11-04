function renderProfileTabs() {
    const profileTabsContainer = document.getElementById('profile-tabs-container');
    const currentWorkbook = getCurrentWorkbook();
    
    if (!profileTabsContainer) {
        console.error('Profile tabs container not found');
        return;
    }
    
    if (!currentWorkbook) return;
    
    // Clear existing tabs except the add button
    const addButton = profileTabsContainer.querySelector('.add-profile-tab');
    profileTabsContainer.innerHTML = '';
    if (addButton) {
        profileTabsContainer.appendChild(addButton);
    } else {
        profileTabsContainer.innerHTML = `
            <button class="add-profile-tab" id="add-profile-tab-btn" title="Add New Profile">
                <i class="fas fa-plus"></i>
            </button>
        `;
    }
    
    if (!currentWorkbook.profiles || currentWorkbook.profiles.length === 0) {
        return;
    }
    
    currentWorkbook.profiles.forEach(profile => {
        const profileTab = document.createElement('div');
        profileTab.className = `profile-tab ${profile.id === currentProfileId ? 'active' : ''}`;
        profileTab.dataset.profileId = profile.id;
        
        // Apply the profile color as a CSS variable for the left border
        profileTab.style.setProperty('--profile-color', profile.color || '#3498db');
        
        profileTab.innerHTML = `
            <span class="profile-tab-name">${profile.name}</span>
            <div class="profile-tab-actions">
                <button class="profile-tab-action-btn profile-color-picker-btn" title="Change Color" data-action="color">
                    <i class="fas fa-palette"></i>
                </button>
                <button class="profile-tab-action-btn profile-move-btn" title="Move Profile" data-action="move">
                    <i class="fas fa-arrows-alt"></i>
                </button>
                <button class="profile-tab-action-btn profile-rename-btn" title="Rename Profile" data-action="rename">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="profile-tab-action-btn profile-delete-btn" title="Delete Profile" data-action="delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        profileTabsContainer.insertBefore(profileTab, profileTabsContainer.querySelector('.add-profile-tab'));
        
        // Add main tab click event
        profileTab.addEventListener('click', (e) => {
            // Only trigger profile switch if clicking on the tab itself, not action buttons
            if (!e.target.closest('.profile-tab-action-btn')) {
                if (typeof switchProfile === 'function') {
                    switchProfile(profile.id);
                } else {
                    console.error('switchProfile function not found');
                }
            }
        });
        
        // Add individual button handlers with better error handling
        attachButtonHandlers(profileTab, profile);
    });
    
    // Update scrolling
    if (typeof updateProfileScroll === 'function') {
        updateProfileScroll();
    }
}

function attachButtonHandlers(profileTab, profile) {
    const buttons = {
        move: profileTab.querySelector('.profile-move-btn'),
        color: profileTab.querySelector('.profile-color-picker-btn'),
        rename: profileTab.querySelector('.profile-rename-btn'),
        delete: profileTab.querySelector('.profile-delete-btn')
    };
    
    // Move button
    if (buttons.move) {
        buttons.move.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof openMoveProfileModal === 'function') {
                openMoveProfileModal(profile);
            } else {
                console.error('openMoveProfileModal function not found');
            }
        });
    }
    
    // Color button
    if (buttons.color) {
        buttons.color.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof openProfileColorModal === 'function') {
                openProfileColorModal(profile);
            } else {
                console.error('openProfileColorModal function not found');
            }
        });
    }
    
    // Rename button
    if (buttons.rename) {
        buttons.rename.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof openRenameProfileModal === 'function') {
                openRenameProfileModal(profile);
            } else {
                console.error('openRenameProfileModal function not found');
            }
        });
    }
    
    // Delete button
    if (buttons.delete) {
        buttons.delete.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof deleteProfile === 'function') {
                if (confirm(`Are you sure you want to delete the profile "${profile.name}"?`)) {
                    deleteProfile(profile.id);
                }
            } else {
                console.error('deleteProfile function not found');
            }
        });
    }
}