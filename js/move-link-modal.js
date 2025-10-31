// js/move-link-modal.js

(function() {
    'use strict';
    
    let isInitialized = false;
    let linkToMove = null;
    let selectedDestinationTab = null;

    function initMoveLinkModal() {
        if (isInitialized) return;
        isInitialized = true;
        
        // Create modal if it doesn't exist
        if (!document.getElementById('move-link-modal')) {
            createModal();
        }
        setupEventListeners();
    }

    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'move-link-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="move-link-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Move Link</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <p>Select a destination tab for this link:</p>
                
                <!-- Add the destination path display here -->
                <div class="selected-destination-path" id="selected-destination-path" style="display: none;">
                    <!-- Selected path will be shown here -->
                </div>
                
                <div id="move-link-destinations">
                    <!-- Destinations will be populated here -->
                </div>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-move-link-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-move-link-btn">Move</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    function setupEventListeners() {
        const modal = document.getElementById('move-link-modal');
        if (!modal) return;

        // Close modal events
        modal.querySelector('.close-modal').addEventListener('click', hideModal);
        modal.querySelector('#close-move-link-modal').addEventListener('click', hideModal);

        // Save move
        modal.querySelector('#save-move-link-btn').addEventListener('click', saveMove);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }

    function showModal(link) {
        const modal = document.getElementById('move-link-modal');
        if (modal) {
            linkToMove = link;
            selectedDestinationTab = null;
            
            populateDestinations();
            modal.style.display = 'flex';
        }
    }

    function hideModal() {
        const modal = document.getElementById('move-link-modal');
        if (modal) {
            modal.style.display = 'none';
            linkToMove = null;
            selectedDestinationTab = null;
            
            // Clear destination path
            const pathElement = document.getElementById('selected-destination-path');
            if (pathElement) {
                pathElement.style.display = 'none';
                pathElement.innerHTML = '';
            }
        }
    }

    function populateDestinations() {
        const destinationsContainer = document.getElementById('move-link-destinations');
        if (!destinationsContainer) return;
        
        destinationsContainer.innerHTML = '';
        
        // Create a hierarchical view of workbooks -> profiles -> environments -> tabs
        if (window.workbooks && Array.isArray(window.workbooks)) {
            window.workbooks.forEach(workbook => {
                workbook.profiles.forEach(profile => {
                    const profileElement = document.createElement('div');
                    profileElement.className = 'move-link-profile';
                    profileElement.dataset.profileId = profile.id;
                    
                    // Check if this is the current profile
                    const isCurrentProfile = profile.id === (window.currentProfileId || null);
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
        }
    }

    // Helper function to populate environments for a profile
    function populateProfileEnvironments(profile, container, type) {
        if (!profile.environments || !Array.isArray(profile.environments)) return;
        
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
                
                // If we're expanding and content is empty, populate it
                if (environmentElement.classList.contains('expanded') && environmentContent.innerHTML === '') {
                    console.log('Populating tabs for environment:', environment.name);
                    populateEnvironmentTabs(environment, environmentContent, type);
                } else if (!environmentElement.classList.contains('expanded')) {
                    // Clear content when collapsing to save memory
                    environmentContent.innerHTML = '';
                }
            });
        });
    }

    // Helper function to populate tabs for an environment
    function populateEnvironmentTabs(environment, container, type) {
        if (!environment.tabs || !Array.isArray(environment.tabs)) return;
        
        environment.tabs.forEach(tab => {
            const tabElement = document.createElement('div');
            tabElement.className = 'move-link-tab';
            tabElement.dataset.tabId = tab.id;
            
            // Check if this is the current tab (for visual indication)
            const isCurrentTab = tab === (window.currentTab || null) && environment === (window.currentEnvironment || null);
            const tabBadge = isCurrentTab ? '<span class="tab-badge">Current</span>' : '';
            
            tabElement.innerHTML = `
                <div class="move-link-tab-item ${isCurrentTab ? 'current-tab' : ''}">
                    <input type="radio" name="link-destination" id="link-dest-${tab.id}" value="${tab.id}">
                    <label for="link-dest-${tab.id}">
                        <span class="tab-name">${tab.name}</span>
                        ${tabBadge}
                        <span class="link-count">${tab.links ? tab.links.length : 0} links</span>
                    </label>
                </div>
            `;
            
            container.appendChild(tabElement);
            
            const radio = tabElement.querySelector('input[type="radio"]');
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    selectedDestinationTab = tab;
                    updateSelectedDestinationPath(workbook, profile, environment, tab);
                }
            });
        });
    }

    // Helper function to update the selected destination path display
    function updateSelectedDestinationPath(workbook, profile, environment, tab) {
        const pathElement = document.getElementById('selected-destination-path');
        if (!pathElement) return;
        
        pathElement.innerHTML = `
            <strong>Selected Destination:</strong> 
            ${workbook.name} → ${profile.name} → ${environment.name} → ${tab.name}
        `;
        pathElement.style.display = 'block';
    }

    function saveMove() {
        if (window.bulkLinksToMove && selectedDestinationTab) {
            // Bulk move operation
            if (typeof window.saveBulkMoveLinks === 'function') {
                window.saveBulkMoveLinks(selectedDestinationTab);
                window.bulkLinksToMove = null; // Clear bulk mode
                hideModal();
            } else {
                console.error('saveBulkMoveLinks function not found');
            }
        } else if (linkToMove && selectedDestinationTab) {
            // Single move operation
            if (typeof window.moveLink === 'function') {
                window.moveLink(linkToMove, selectedDestinationTab);
                hideModal();
            } else {
                console.error('moveLink function not found');
                alert('Error: Move function not available');
            }
        } else {
            alert('Please select a destination tab');
        }
    }

    // Helper function to find workbook by profile
    function findWorkbookByProfile(profileId) {
        if (!window.workbooks) return null;
        for (const workbook of window.workbooks) {
            if (workbook.profiles.some(p => p.id === profileId)) {
                return workbook;
            }
        }
        return null;
    }

    // Helper function to find profile by environment
    function findProfileByEnvironment(environmentId) {
        if (!window.workbooks) return null;
        for (const workbook of window.workbooks) {
            for (const profile of workbook.profiles) {
                if (profile.environments.some(e => e.id === environmentId)) {
                    return { workbook, profile };
                }
            }
        }
        return null;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMoveLinkModal);
    } else {
        initMoveLinkModal();
    }

    // Export to global scope
    window.openMoveLinkModal = showModal;

})();