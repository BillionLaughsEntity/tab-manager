function openMoveLinkModal(link) {
    linkToMove = link;
    selectedDestinationTab = null;
    window.bulkLinksToMove = null; // Clear any bulk move data
    
    const destinationsContainer = document.getElementById('move-link-destinations');
    destinationsContainer.innerHTML = '';
    
    console.log('Opening move link modal for workbooks:', workbooks);
    
    // Create a hierarchical view of workbooks -> profiles -> environments -> tabs
    workbooks.forEach(workbook => {
        workbook.profiles.forEach(profile => {
            const profileElement = document.createElement('div');
            profileElement.className = 'move-link-profile';
            profileElement.dataset.profileId = profile.id;
            
            // Check if this is the current profile
            const isCurrentProfile = profile.id === currentProfileId;
            const profileBadge = isCurrentProfile ? '<span class="profile-badge">Current</span>' : '';
            
            profileElement.innerHTML = `
                <div class="move-link-profile-header ${isCurrentProfile ? 'current-profile' : ''}">
                    <span>${workbook.name} → ${profile.name} ${profileBadge}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="move-link-profile-content">
                    <!-- Environments will be added here -->
                </div>
            `;
            
            destinationsContainer.appendChild(profileElement);
            
            const profileHeader = profileElement.querySelector('.move-link-profile-header');
            const profileContent = profileElement.querySelector('.move-link-profile-content');
            
            profileHeader.addEventListener('click', (e) => {
                e.stopPropagation();
                profileElement.classList.toggle('expanded');
                
                // If we're expanding and content is empty, populate it
                if (profileElement.classList.contains('expanded') && profileContent.innerHTML === '') {
                    console.log('Populating environments for profile:', profile.name);
                    populateProfileEnvironments(profile, profileContent, 'link');
                } else if (!profileElement.classList.contains('expanded')) {
                    // Clear content when collapsing to save memory
                    profileContent.innerHTML = '';
                }
            });
        });
    });
    
    moveLinkModal.style.display = 'flex';
}