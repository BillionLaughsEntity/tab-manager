// Open clone to tab modal
function openCloneToTabModal() {
    if (selectedLinks.size === 0) return;
    
    window.linksToClone = Array.from(selectedLinks).map(linkId => 
        currentTab.links.find(link => link.id === linkId)
    );
    
    const destinationsContainer = document.getElementById('clone-link-destinations');
    destinationsContainer.innerHTML = '';
    
    // Store current profile ID for reference
    const currentProfileId = getCurrentProfile().id;
    
    workbooks.forEach(w => w.profiles.forEach(profile => {
        const profileElement = document.createElement('div');
        profileElement.className = 'move-link-profile';
        profileElement.dataset.profileId = profile.id;
        
        // Add visual indicator for current profile
        const isCurrentProfile = profile.id === currentProfileId;
        const currentProfileBadge = isCurrentProfile ? ' <span style="color: #3498db; font-size: 0.8em;">(Current)</span>' : '';
        
        profileElement.innerHTML = `
            <div class="move-link-profile-header">
                <span>${profile.name}${currentProfileBadge}</span>
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
            
            if (profileElement.classList.contains('expanded') && profileContent.innerHTML === '') {
                populateProfileEnvironmentsForClone(profile, profileContent);
            } else if (!profileElement.classList.contains('expanded')) {
                profileContent.innerHTML = '';
            }
        });
    }));
    
    // Update modal title
    document.getElementById('clone-modal-title').textContent = 
        `Clone ${window.linksToClone.length} Links to Tab`;
    
    // Update the save button text
    document.getElementById('save-clone-to-tab-btn').textContent = 
        `Clone ${window.linksToClone.length} Links`;
    
    // Reset selection
    window.selectedCloneDestinationTab = null;
    window.selectedCloneDestinationProfile = null;
    window.selectedCloneDestinationEnvironment = null;
    updateCloneDestinationDisplay();
    
    document.getElementById('clone-to-tab-modal').style.display = 'flex';
}