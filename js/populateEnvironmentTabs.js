// Fix the populateEnvironmentTabs function
// Ensure populateEnvironmentTabs is working correctly
function populateEnvironmentTabs(environment, container) {
    console.log('Populating tabs for environment:', environment.name);
    console.log('Environment tabs:', environment.tabs);
    
    // Clear the container first
    container.innerHTML = '';
    
    if (!environment.tabs || environment.tabs.length === 0) {
        container.innerHTML = '<div style="padding: 10px; text-align: center; color: #7f8c8d;">No tabs in this environment</div>';
        return;
    }
    
    environment.tabs.forEach(tab => {
        console.log('Processing tab:', tab.name);
        
        const tabElement = document.createElement('div');
        tabElement.className = 'move-link-tab';
        tabElement.dataset.tabId = tab.id;
        tabElement.innerHTML = `
            <i class="fas fa-folder" style="margin-right: 8px; color: #3498db;"></i>
            ${tab.name}
            <small style="margin-left: 8px; color: #7f8c8d;">(${tab.links ? tab.links.length : 0} links)</small>
        `;
        
        // Don't allow moving to the same tab
        if (tab === currentTab && environment.id === currentEnvironment.id) {
            tabElement.style.opacity = '0.5';
            tabElement.style.cursor = 'not-allowed';
            tabElement.title = 'Cannot move to the same tab';
        } else {
            tabElement.addEventListener('click', () => {
                // Deselect previously selected tab
                document.querySelectorAll('.move-link-tab.selected').forEach(item => {
                    item.classList.remove('selected');
                });
                
                // Select this tab
                tabElement.classList.add('selected');
                selectedDestinationTab = tab;
                
                // Show selected destination path
                updateSelectedDestinationPath();
            });
        }
        
        container.appendChild(tabElement);
    });
}