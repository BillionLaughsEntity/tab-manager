// Add function to populate workbook profiles for environment movement
function populateWorkbookProfiles(workbook, container) {
    console.log('Populating profiles for workbook:', workbook.name);
    
    // Clear the container first
    container.innerHTML = '';
    
    if (!workbook.profiles || workbook.profiles.length === 0) {
        container.innerHTML = '<div style="padding: 10px; text-align: center; color: #7f8c8d;">No profiles in this workbook</div>';
        return;
    }
    
    workbook.profiles.forEach(profile => {
        console.log('Processing profile:', profile.name);
        
        const profileElement = document.createElement('div');
        profileElement.className = 'move-environment-profile';
        profileElement.dataset.profileId = profile.id;
        profileElement.innerHTML = `
            <i class="fas fa-user" style="margin-right: 8px; color: ${profile.color};"></i>
            ${profile.name}
            <small style="margin-left: 8px; color: #7f8c8d;">(${profile.environments ? profile.environments.length : 0} environments)</small>
        `;
        
        // Don't allow moving to the same profile
        if (profile.id === currentProfileId) {
            profileElement.style.opacity = '0.5';
            profileElement.style.cursor = 'not-allowed';
            profileElement.title = 'Cannot move to the same profile';
        } else {
            profileElement.addEventListener('click', () => {
                // Deselect previously selected profile
                document.querySelectorAll('.move-environment-profile.selected').forEach(item => {
                    item.classList.remove('selected');
                });
                
                // Select this profile
                profileElement.classList.add('selected');
                selectedDestinationProfile = profile;
                
                // Show selected destination path
                updateSelectedEnvironmentDestinationPath();
            });
        }
        
        container.appendChild(profileElement);
    });
}