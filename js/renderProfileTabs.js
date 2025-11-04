function renderProfileTabs() {
    const profileTabsContainer = document.getElementById('profile-tabs-container');
    const currentWorkbook = getCurrentWorkbook();

    console.log('=== RENDER PROFILE TABS DEBUG ===');
    console.log('Current workbook:', currentWorkbook);
    console.log('Current workbook ID:', currentWorkbook?.id);
    console.log('Current workbook profiles:', currentWorkbook?.profiles);
    console.log('Profiles array length:', currentWorkbook?.profiles?.length);

    if (!currentWorkbook) {
        console.log('No current workbook found');
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
                <button class="profile-tab-action-btn profile-color-picker-btn" title="Change Color">
                    <i class="fas fa-palette"></i>
                </button>
                <button class="profile-tab-action-btn profile-move-btn" title="Move Profile">
                    <i class="fas fa-arrows-alt"></i>
                </button>
                <button class="profile-tab-action-btn profile-rename-btn" title="Rename Profile">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="profile-tab-action-btn profile-delete-btn" title="Delete Profile">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        profileTabsContainer.insertBefore(profileTab, profileTabsContainer.querySelector('.add-profile-tab'));
        
        // Add click event
        profileTab.addEventListener('click', (e) => {
            if (!e.target.closest('.profile-tab-action-btn')) {
                switchProfile(profile.id);
            }
        });
        
        // Add move event
        const moveBtn = profileTab.querySelector('.profile-move-btn');
        moveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof openMoveProfileModal === 'function') {
                openMoveProfileModal(profile);
            }
        });

        // Add color picker event
        const colorBtn = profileTab.querySelector('.profile-color-picker-btn');
        colorBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openProfileColorModal(profile);
        });
        
        // Add rename event
        const renameBtn = profileTab.querySelector('.profile-rename-btn');
        renameBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openRenameProfileModal(profile);
        });
        
        // Add delete event
        const deleteBtn = profileTab.querySelector('.profile-delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`Are you sure you want to delete the profile "${profile.name}"?`)) {
                deleteProfile(profile.id);
            }
        });
    });

    console.log('=== END RENDER PROFILE TABS DEBUG ===');
    
    // Update scrolling
    updateProfileScroll();
}