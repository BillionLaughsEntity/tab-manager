// Update bulk selection counter
function updateBulkSelectionCount() {
    const countElement = document.getElementById('bulk-selection-count');
    countElement.textContent = `${selectedLinks.size} item${selectedLinks.size !== 1 ? 's' : ''} selected`;
    
    // Enable/disable action buttons based on selection
    const hasSelection = selectedLinks.size > 0;
    document.getElementById('bulk-move-btn').disabled = !hasSelection;
    document.getElementById('bulk-delete-btn').disabled = !hasSelection;
    document.getElementById('bulk-clone-btn').disabled = !hasSelection;
}

// Move selected links
function moveSelectedLinks() {
    if (selectedLinks.size === 0) return;
    
    // Store the selected link IDs in a global variable for the modal
    window.bulkLinksToMove = Array.from(selectedLinks).map(linkId => 
        currentTab.links.find(link => link.id === linkId)
    );
    
    // Use your existing move link modal, but modify it for bulk operations
    openBulkMoveLinkModal();
}

// In your main script, update the deleteSelectedLinks function
function deleteSelectedLinks() {
    if (selectedLinks.size === 0) return;
    
    const confirmMessage = `Are you sure you want to move ${selectedLinks.size} link${selectedLinks.size !== 1 ? 's' : ''} to trash?`;
    
    if (confirm(confirmMessage)) {
        const linksToDelete = Array.from(selectedLinks).map(linkId => 
            currentTab.links.find(link => link.id === linkId)
        );
        
        // Move each selected link to trash
        linksToDelete.forEach(link => {
            const trashItem = {
                id: 'trash-' + Date.now(),
                type: 'link',
                originalId: link.id,
                data: link,
                parentTab: {
                    id: currentTab.id,
                    name: currentTab.name
                },
                parentEnvironment: currentEnvironment ? {
                    id: currentEnvironment.id,
                    name: currentEnvironment.name
                } : null,
                parentProfile: getCurrentProfile() ? {
                    id: getCurrentProfile().id,
                    name: getCurrentProfile().name
                } : null,
                parentWorkbook: getCurrentWorkbook() ? {
                    id: getCurrentWorkbook().id,
                    name: getCurrentWorkbook().name
                } : null,
                deletedAt: new Date().toISOString()
            };
            
            trashBin.push(trashItem);
        });
        
        saveTrashBin();
        
        // Remove selected links from current tab
        currentTab.links = currentTab.links.filter(link => !selectedLinks.has(link.id));
        
        // Save and refresh
        saveWorkbooks();
        renderLinks(currentTab);
        
        // Clear selection and exit selection mode
        selectedLinks.clear();
        toggleSelectionMode();
    }
}

// Enhanced bulk move modal with cross-profile support
function openBulkMoveLinkModal() {
    const destinationsContainer = document.getElementById('move-link-destinations');
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
                populateProfileEnvironmentsForBulkMove(profile, profileContent);
            } else if (!profileElement.classList.contains('expanded')) {
                profileContent.innerHTML = '';
            }
        });
    }));
    
    // Update modal title for bulk operation
    document.querySelector('#move-link-modal .modal-title').textContent = 
        `Move ${window.bulkLinksToMove.length} Links`;
    
    // Update the save button text
    document.getElementById('save-move-link-btn').textContent = `Move ${window.bulkLinksToMove.length} Links`;
    
    moveLinkModal.style.display = 'flex';
}

// Enhanced save function for cross-profile bulk moves
function saveBulkMoveLinks() {
    if (!window.bulkLinksToMove || window.bulkLinksToMove.length === 0) return;
    if (!selectedDestinationTab || !selectedDestinationProfile || !selectedDestinationEnvironment) {
        alert('Please select a destination tab');
        return;
    }
    
    const currentProfile = getCurrentProfile();
    const isSameProfile = selectedDestinationProfile.id === currentProfile.id;
    
    // Show confirmation for cross-profile moves
    if (!isSameProfile) {
        const confirmMove = confirm(
            `You are about to move ${window.bulkLinksToMove.length} links to a different profile (${selectedDestinationProfile.name}). This action cannot be undone. Continue?`
        );
        if (!confirmMove) return;
    }
    
    // Move each selected link
    window.bulkLinksToMove.forEach(link => {
        if (isSameProfile) {
            // Same profile move - just remove from current tab and add to destination
            currentTab.links = currentTab.links.filter(l => l.id !== link.id);
        } else {
            // Cross-profile move - need to remove from current profile entirely
            // and find the exact location in the current tab
            const currentEnv = currentEnvironment;
            currentEnv.tabs.forEach(tab => {
                if (tab === currentTab) {
                    tab.links = tab.links.filter(l => l.id !== link.id);
                }
            });
        }
        
        // Add to destination tab
        selectedDestinationTab.links.push(link);
    });
    
    saveWorkbooks();
    
    // Refresh appropriate views based on move type
    if (isSameProfile) {
        // Same profile - just refresh current tab
        renderLinks(currentTab);
    } else {
        // Cross-profile - need to refresh both profiles
        renderProfileTabs();
        renderEnvironments();
        
        // Show success message
        setTimeout(() => {
            alert(`Successfully moved ${window.bulkLinksToMove.length} links to profile "${selectedDestinationProfile.name}"`);
        }, 100);
    }
    
    // Clear selection and exit selection mode
    selectedLinks.clear();
    toggleSelectionMode();
    
    // Clean up
    window.bulkLinksToMove = null;
    selectedDestinationTab = null;
    selectedDestinationProfile = null;
    selectedDestinationEnvironment = null;
    
    moveLinkModal.style.display = 'none';
}

// Enhanced environment population for bulk moves
function populateProfileEnvironmentsForBulkMove(profile, container) {
    container.innerHTML = '';
    
    if (!profile.environments || profile.environments.length === 0) {
        container.innerHTML = `
            <div style="padding: 15px; text-align: center; color: #7f8c8d;">
                <p>No environments in this profile</p>
                <button class="modal-btn modal-btn-primary" onclick="createEnvironmentForBulkMove('${profile.id}')" style="margin-top: 10px;">
                    <i class="fas fa-plus"></i>Create Environment
                </button>
            </div>
        `;
        return;
    }
    
    profile.environments.forEach(environment => {
        const environmentElement = document.createElement('div');
        environmentElement.className = 'move-link-environment';
        environmentElement.dataset.environmentId = environment.id;
        
        environmentElement.innerHTML = `
            <div class="move-link-environment-header">
                <span>${environment.name}</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="move-link-environment-content">
                <!-- Tabs will be added here -->
            </div>
        `;
        
        container.appendChild(environmentElement);
        
        const environmentHeader = environmentElement.querySelector('.move-link-environment-header');
        const environmentContent = environmentElement.querySelector('.move-link-environment-content');
        
        environmentHeader.addEventListener('click', (e) => {
            e.stopPropagation();
            environmentElement.classList.toggle('expanded');
            
            if (environmentElement.classList.contains('expanded') && environmentContent.innerHTML === '') {
                populateEnvironmentTabsForBulkMove(environment, environmentContent, profile.id);
            } else if (!environmentElement.classList.contains('expanded')) {
                environmentContent.innerHTML = '';
            }
        });
    });
}

// Enhanced tab population for bulk moves
function populateEnvironmentTabsForBulkMove(environment, container, profileId) {
    container.innerHTML = '';
    
    if (!environment.tabs || environment.tabs.length === 0) {
        container.innerHTML = `
            <div style="padding: 10px; text-align: center; color: #7f8c8d;">
                <p>No tabs in this environment</p>
                <button class="modal-btn modal-btn-primary" onclick="createTabForBulkMove('${profileId}', '${environment.id}')" style="margin-top: 5px; padding: 5px 10px; font-size: 0.8em;">
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
        
        // Don't allow moving to the same tab (within same profile and environment)
        const isSameTab = profileId === getCurrentProfile().id && 
                        environment === currentEnvironment && 
                        tab === currentTab;
        
        if (isSameTab) {
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
                selectedDestinationProfile = profiles.find(p => p.id === profileId);
                selectedDestinationEnvironment = environment;
            });
        }
        
        container.appendChild(tabElement);
    });
}

// Helper function to create environment during bulk move
function createEnvironmentForBulkMove(profileId) {
    const envName = prompt('Enter name for new environment:');
    if (!envName) return;
    
    const profile = profiles.find(p => p.id === profileId);
    if (!profile) return;
    
    if (!profile.environments) {
        profile.environments = [];
    }
    
    const newEnvironment = {
        id: 'env-' + Date.now(),
        name: envName,
        tabs: []
    };
    
    profile.environments.push(newEnvironment);
    saveWorkbooks();
    
    // Refresh the modal to show the new environment
    openBulkMoveLinkModal();
}

// Helper function to create tab during bulk move
function createTabForBulkMove(profileId, environmentId) {
    const tabName = prompt('Enter name for new tab:');
    if (!tabName) return;
    
    const profile = profiles.find(p => p.id === profileId);
    if (!profile) return;
    
    const environment = profile.environments.find(env => env.id === environmentId);
    if (!environment) return;
    
    if (!environment.tabs) {
        environment.tabs = [];
    }
    
    const newTab = {
        id: 'tab-' + Date.now(),
        name: tabName,
        links: []
    };
    
    environment.tabs.push(newTab);
    saveWorkbooks();
    
    // Refresh the modal to show the new tab
    openBulkMoveLinkModal();
}