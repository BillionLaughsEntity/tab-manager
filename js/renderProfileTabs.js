// Render profile tabs - ONLY for current workbook
function renderProfileTabs() {
    profileTabsContainer.innerHTML = '';
    
    const currentWorkbook = getCurrentWorkbook();
    if (!currentWorkbook || !currentWorkbook.profiles) return;
    
    currentWorkbook.profiles.forEach(profile => {
        const profileTab = document.createElement('button');
        profileTab.className = 'profile-tab';
        if (profile.id === currentProfileId) {
            profileTab.classList.add('active');
        }
        profileTab.dataset.profileId = profile.id;
        profileTab.style.setProperty('--profile-color', profile.color);
        
        profileTab.innerHTML = `
            <div class="profile-tab-color" style="background-color: ${profile.color}"></div>
            <div class="profile-tab-name">${profile.name}</div>
            <div class="profile-tab-actions">
                <button class="profile-tab-action profile-tab-edit" title="Rename Profile">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="profile-tab-action profile-tab-move" title="Move Profile">
                    <i class="fas fa-arrows-alt"></i>
                </button>
                <button class="profile-tab-action profile-tab-color-picker" title="Change Color">
                    <i class="fas fa-palette"></i>
                </button>
                <button class="profile-tab-action profile-tab-close" title="Delete Profile">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        profileTabsContainer.appendChild(profileTab);

        // Add event listeners...
        const moveBtn = profileTab.querySelector('.profile-tab-move');
        moveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openMoveProfileModal(profile);
        });
        
        // Add event listener for switching profiles
        profileTab.addEventListener('click', (e) => {
            if (!e.target.closest('.profile-tab-edit') && 
                !e.target.closest('.profile-tab-close') &&
                !e.target.closest('.profile-tab-color-picker')) {
                switchProfile(profile.id);
            }
        });
        
        // Add event listener for renaming profile
        const editBtn = profileTab.querySelector('.profile-tab-edit');
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof openRenameProfileModal === 'function') {
                openRenameProfileModal(profile);
            }
        });
        
        // Add event listener for color picker
        const colorBtn = profileTab.querySelector('.profile-tab-color-picker');
        colorBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openColorModal(profile);
        });
        
        // Add event listener for deleting profile
        const closeBtn = profileTab.querySelector('.profile-tab-close');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteProfile(profile.id);
        });
    });
    
    // Add the "+" button at the end
    profileTabsContainer.appendChild(addProfileTabBtn);
}