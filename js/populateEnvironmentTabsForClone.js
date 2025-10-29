// Populate tabs for clone operation
function populateEnvironmentTabsForClone(environment, container, profileId) {
    container.innerHTML = '';
    
    if (!environment.tabs || environment.tabs.length === 0) {
        container.innerHTML = `
            <div style="padding: 10px; text-align: center; color: #7f8c8d;">
                <p>No tabs in this environment</p>
                <button class="modal-btn modal-btn-primary" onclick="createTabForClone('${profileId}', '${environment.id}')" style="margin-top: 5px; padding: 5px 10px; font-size: 0.8em;">
                    <i class="fas fa-plus"></i>Create Tab
                </button>
            </div>
        `;
        return;
    }
    
    environment.tabs.forEach(tab => {
        const tabElement = document.createElement('div');
        tabElement.className = 'move-link-tab';
        tabElement.dataset.tabId = tab.id;
        tabElement.dataset.profileId = profileId;
        tabElement.dataset.environmentId = environment.id;
        tabElement.textContent = tab.name;
        
        tabElement.addEventListener('click', () => {
            // Deselect previously selected tab
            document.querySelectorAll('#clone-link-destinations .move-link-tab.selected').forEach(item => {
                item.classList.remove('selected');
            });
            
            // Select this tab
            tabElement.classList.add('selected');
            
            // Find the actual objects, not just IDs
            const profile = findProfileById(profileId);
            const env = profile.environments.find(env => env.id === environment.id);
            const destinationTab = env.tabs.find(t => t.id === tab.id);
            
            // Set the global variables
            window.selectedCloneDestinationTab = destinationTab;
            window.selectedCloneDestinationProfile = profile;
            window.selectedCloneDestinationEnvironment = env;
            
            updateCloneDestinationDisplay();
        });
        
        container.appendChild(tabElement);
    });
}