// Fix the populateProfileEnvironments function for link movement
function populateProfileEnvironments(profile, container, type) {
    console.log('Populating environments for profile:', profile.name, 'Type:', type);
    
    // Clear the container first
    container.innerHTML = '';
    
    if (!profile.environments || profile.environments.length === 0) {
        container.innerHTML = '<div style="padding: 10px; text-align: center; color: #7f8c8d;">No environments in this profile</div>';
        return;
    }
    
    profile.environments.forEach(environment => {
        console.log('Processing environment:', environment.name);
        
        if (type === 'link') {
            // For moving links, show environments as expandable containers with tabs inside
            const environmentElement = document.createElement('div');
            environmentElement.className = 'move-link-environment';
            environmentElement.dataset.environmentId = environment.id;
            
            environmentElement.innerHTML = `
                <div class="move-link-environment-header">
                    <span>${environment.name}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="move-link-environment-content">
                    <!-- Tabs will be added here when expanded -->
                </div>
            `;
            
            container.appendChild(environmentElement);
            
            const environmentHeader = environmentElement.querySelector('.move-link-environment-header');
            const environmentContent = environmentElement.querySelector('.move-link-environment-content');
            
            environmentHeader.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event from bubbling up to profile
                environmentElement.classList.toggle('expanded');
                
                // If we're expanding and content is empty, populate it
                if (environmentElement.classList.contains('expanded') && environmentContent.innerHTML === '') {
                    console.log('Populating tabs for environment:', environment.name);
                    populateEnvironmentTabs(environment, environmentContent);
                } else if (!environmentElement.classList.contains('expanded')) {
                    // Clear content when collapsing to save memory
                    environmentContent.innerHTML = '';
                }
            });
            
        } else {
            // For moving tabs, show environments as clickable items (existing code)
            const environmentElement = document.createElement('div');
            environmentElement.className = 'move-tab-environment';
            environmentElement.dataset.environmentId = environment.id;
            environmentElement.innerHTML = `
                <i class="fas fa-folder" style="margin-right: 8px; color: #3498db;"></i>
                ${environment.name}
                <small style="margin-left: 8px; color: #7f8c8d;">(${environment.tabs ? environment.tabs.length : 0} tabs)</small>
            `;
            
            // Don't allow moving to the same environment
            if (environment === currentEnvironment && profile.id === currentProfileId) {
                environmentElement.style.opacity = '0.5';
                environmentElement.style.cursor = 'not-allowed';
                environmentElement.title = 'Cannot move to the same environment';
            } else {
                environmentElement.addEventListener('click', () => {
                    // Deselect previously selected environment
                    document.querySelectorAll('.move-tab-environment.selected').forEach(item => {
                        item.classList.remove('selected');
                    });
                    
                    // Select this environment
                    environmentElement.classList.add('selected');
                    selectedDestinationEnvironment = environment;
                    selectedDestinationProfile = profile;
                    
                    // Show selected destination path
                    updateSelectedTabDestinationPath();
                });
            }
            
            container.appendChild(environmentElement);
        }
    });
}