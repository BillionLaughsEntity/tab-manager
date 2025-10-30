// Fix openMoveTabModal to show environments across current workbook and other workbooks
function openMoveTabModal(tab) {
    tabToMove = tab;
    selectedDestinationEnvironment = null;
    
    const destinationsContainer = document.getElementById('move-tab-destinations');
    destinationsContainer.innerHTML = '';
    
    console.log('Opening move tab modal for tab:', tab.name);
    
    // Create a hierarchical view of workbooks -> profiles -> environments
    workbooks.forEach(workbook => {
        workbook.profiles.forEach(profile => {
            const profileElement = document.createElement('div');
            profileElement.className = 'move-tab-profile';
            profileElement.dataset.profileId = profile.id;
            
            // Check if this is the current profile
            const isCurrentProfile = profile.id === currentProfileId;
            const profileBadge = isCurrentProfile ? '<span class="profile-badge">Current</span>' : '';
            
            profileElement.innerHTML = `
                <div class="move-tab-profile-header ${isCurrentProfile ? 'current-profile' : ''}">
                    <span>${workbook.name} → ${profile.name} ${profileBadge}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="move-tab-profile-content">
                    <!-- Environments will be added here -->
                </div>
            `;
            
            destinationsContainer.appendChild(profileElement);
            
            const profileHeader = profileElement.querySelector('.move-tab-profile-header');
            const profileContent = profileElement.querySelector('.move-tab-profile-content');
            
            profileHeader.addEventListener('click', (e) => {
                e.stopPropagation();
                profileElement.classList.toggle('expanded');
                
                // If we're expanding and content is empty, populate it
                if (profileElement.classList.contains('expanded') && profileContent.innerHTML === '') {
                    console.log('Populating environments for profile:', profile.name);
                    populateProfileEnvironments(profile, profileContent, 'tab');
                } else if (!profileElement.classList.contains('expanded')) {
                    // Clear content when collapsing to save memory
                    profileContent.innerHTML = '';
                }
            });
        });
    });
    
    if (typeof openMoveTabModal === 'function') {
        openMoveTabModal(tab);
    }
}