// renderProfileTabs.js - Updated version
function renderProfileTabs() {
    console.log('=== RENDER PROFILE TABS DEBUG ===');
    const profileTabsContainer = document.getElementById('profile-tabs-container');
    const currentWorkbook = getCurrentWorkbook();
    
    console.log('Current workbook:', currentWorkbook);
    console.log('Profile tabs container:', profileTabsContainer);
    
    if (!currentWorkbook || !profileTabsContainer) {
        console.error('Cannot render profile tabs: missing workbook or container');
        return;
    }
    
    // Clear existing tabs except the add button
    const existingTabs = profileTabsContainer.querySelectorAll('.profile-tab:not(.add-profile-tab)');
    existingTabs.forEach(tab => tab.remove());
    
    console.log('Rendering', currentWorkbook.profiles.length, 'profile tabs');
    
    currentWorkbook.profiles.forEach(profile => {
        const profileTab = document.createElement('div');
        profileTab.className = 'profile-tab';
        profileTab.dataset.profileId = profile.id;
        
        // Add active class if this is the current profile
        if (profile.id === currentProfileId) {
            profileTab.classList.add('active');
        }
        
        profileTab.innerHTML = `
            <div class="profile-tab-content">
                <div class="profile-color-indicator" style="background-color: ${profile.color || '#3498db'};"></div>
                <span class="profile-tab-name">${profile.name}</span>
                <div class="profile-tab-actions">
                    <button class="profile-tab-action-btn rename-profile-btn" title="Rename Profile">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="profile-tab-action-btn move-profile-btn" title="Move Profile to Another Workbook">
                        <i class="fas fa-arrows-alt"></i>
                    </button>
                    <button class="profile-tab-action-btn delete-profile-btn" title="Delete Profile">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Insert before the add button
        profileTabsContainer.insertBefore(profileTab, document.getElementById('add-profile-tab-btn'));
        
        // Add event listeners
        addProfileTabEventListeners(profileTab, profile);
    });
    
    console.log('Profile tabs rendered successfully');
}

function addProfileTabEventListeners(profileTab, profile) {
    console.log('Adding event listeners for profile tab:', profile.name);
    
    // Profile tab click (switch to this profile)
    profileTab.addEventListener('click', (e) => {
        if (!e.target.closest('.profile-tab-actions')) {
            console.log('Profile tab clicked:', profile.name);
            switchProfile(profile);
        }
    });
    
    // Delete button
    const deleteBtn = profileTab.querySelector('.delete-profile-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Delete profile button clicked:', profile.name);
            
            const confirmDelete = confirm(`Are you sure you want to delete the profile "${profile.name}" and all its environments?`);
            if (confirmDelete) {
                deleteProfile(profile);
            }
        });
    }
    
    // Rename button
    const renameBtn = profileTab.querySelector('.rename-profile-btn');
    if (renameBtn) {
        renameBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileToRename = profile;
            document.getElementById('rename-profile-input').value = profile.name;
            renameProfileModal.style.display = 'flex';
        });
    }
    
    // Move button
    const moveBtn = profileTab.querySelector('.move-profile-btn');
    if (moveBtn) {
        moveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openMoveProfileModal(profile);
        });
    }
}