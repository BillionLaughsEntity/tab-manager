// js/move-tab-modal.js

(function() {
    'use strict';
    
    let isInitialized = false;
    let tabToMove = null;
    let selectedDestinationEnvironment = null;

    function initMoveTabModal() {
        if (isInitialized) return;
        isInitialized = true;
        
        console.log('Initializing move tab modal...');
        
        // Create modal if it doesn't exist
        if (!document.getElementById('move-tab-modal')) {
            console.log('Creating move tab modal...');
            createModal();
        }
        setupEventListeners();
    }

    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'move-tab-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="move-tab-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Move Tab</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <p>Select a destination environment for this tab:</p>
                
                <!-- Destination path display -->
                <div class="selected-destination-path" id="move-tab-destination-path" style="display: none;">
                    <!-- Selected path will be shown here -->
                </div>
                
                <div class="move-tab-destinations-tree" id="move-tab-destinations">
                    <!-- Tree structure will be populated here -->
                </div>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-move-tab-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-move-tab-btn">Move Tab</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        console.log('Move tab modal created');
    }

    function setupEventListeners() {
        const modal = document.getElementById('move-tab-modal');
        if (!modal) {
            console.error('Move tab modal not found!');
            return;
        }

        // Close modal events
        modal.querySelector('.close-modal').addEventListener('click', hideModal);
        modal.querySelector('#close-move-tab-modal').addEventListener('click', hideModal);

        // Save move
        modal.querySelector('#save-move-tab-btn').addEventListener('click', saveMove);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }

    function showModal(tab) {
        console.log('Opening move tab modal for tab:', tab);
        const modal = document.getElementById('move-tab-modal');
        if (modal) {
            tabToMove = tab;
            selectedDestinationEnvironment = null;
            
            populateDestinationsTree(tab);
            modal.style.display = 'flex';
        } else {
            console.error('Move tab modal not found when trying to show!');
        }
    }

    function hideModal() {
        const modal = document.getElementById('move-tab-modal');
        if (modal) {
            modal.style.display = 'none';
            tabToMove = null;
            selectedDestinationEnvironment = null;
            
            // Clear destination path
            const pathElement = document.getElementById('move-tab-destination-path');
            if (pathElement) {
                pathElement.style.display = 'none';
                pathElement.innerHTML = '';
            }
        }
    }

    function populateDestinationsTree(tab) {
        const destinationsContainer = document.getElementById('move-tab-destinations');
        if (!destinationsContainer) {
            console.error('Destinations container not found!');
            return;
        }
        
        console.log('Populating destinations tree for tab:', tab);
        
        // Get workbooks data using global function
        const workbooks = window.getTabManagerWorkbooks ? window.getTabManagerWorkbooks() : [];
        console.log('Workbooks data retrieved:', workbooks ? workbooks.length : 0, 'workbooks');
        
        destinationsContainer.innerHTML = '';
        
        if (!workbooks || !Array.isArray(workbooks) || workbooks.length === 0) {
            console.error('No valid workbooks data found');
            destinationsContainer.innerHTML = `
                <div class="no-destinations">
                    <p>No workbooks found. Please create a workbook first.</p>
                </div>
            `;
            return;
        }
        
        // Get current environment from the tab's context
        const currentEnvironment = findEnvironmentContainingTab(tab, workbooks);
        console.log('Current environment containing tab:', currentEnvironment);
        
        let hasDestinations = false;
        
        // Create tree structure
        workbooks.forEach(workbook => {
            // Skip workbooks with no profiles
            if (!workbook.profiles || workbook.profiles.length === 0) return;
            
            const workbookItem = createWorkbookTreeItem(workbook, currentEnvironment);
            if (workbookItem) {
                destinationsContainer.appendChild(workbookItem);
                hasDestinations = true;
            }
        });
        
        // If no other environments exist, show message
        if (!hasDestinations) {
            console.log('No destinations found, showing message');
            destinationsContainer.innerHTML = `
                <div class="no-destinations">
                    <p>No other environments available for moving tabs.</p>
                    <p><small>All environments are in the same workbook/profile as the current tab.</small></p>
                </div>
            `;
        }
    }

    function createWorkbookTreeItem(workbook, currentEnvironment) {
        // Filter profiles that have environments (excluding current environment)
        const validProfiles = workbook.profiles.filter(profile => 
            profile.environments && 
            profile.environments.some(env => !currentEnvironment || env.id !== currentEnvironment.id)
        );
        
        if (validProfiles.length === 0) return null;
        
        const workbookItem = document.createElement('div');
        workbookItem.className = 'tree-workbook-item';
        workbookItem.innerHTML = `
            <div class="tree-workbook-header" data-workbook-id="${workbook.id}">
                <i class="fas fa-chevron-right tree-arrow"></i>
                <i class="fas fa-book workbook-icon"></i>
                <span class="tree-workbook-name">${workbook.name}</span>
                <span class="tree-badge">${validProfiles.length} profile${validProfiles.length !== 1 ? 's' : ''}</span>
            </div>
            <div class="tree-profiles-container" style="display: none;"></div>
        `;
        
        const workbookHeader = workbookItem.querySelector('.tree-workbook-header');
        const profilesContainer = workbookItem.querySelector('.tree-profiles-container');
        
        // Populate profiles
        validProfiles.forEach(profile => {
            const profileItem = createProfileTreeItem(workbook, profile, currentEnvironment);
            if (profileItem) {
                profilesContainer.appendChild(profileItem);
            }
        });
        
        // Toggle workbook expansion
        workbookHeader.addEventListener('click', (e) => {
            if (!e.target.classList.contains('environment-radio')) {
                const isExpanded = profilesContainer.style.display === 'block';
                profilesContainer.style.display = isExpanded ? 'none' : 'block';
                const arrow = workbookHeader.querySelector('.tree-arrow');
                arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(90deg)';
            }
        });
        
        return workbookItem;
    }

    function createProfileTreeItem(workbook, profile, currentEnvironment) {
        // Filter environments (excluding current environment)
        const validEnvironments = profile.environments.filter(env => 
            !currentEnvironment || env.id !== currentEnvironment.id
        );
        
        if (validEnvironments.length === 0) return null;
        
        const profileItem = document.createElement('div');
        profileItem.className = 'tree-profile-item';
        profileItem.innerHTML = `
            <div class="tree-profile-header" data-profile-id="${profile.id}">
                <i class="fas fa-chevron-right tree-arrow"></i>
                <i class="fas fa-user profile-icon"></i>
                <span class="tree-profile-name">${profile.name}</span>
                <span class="tree-badge">${validEnvironments.length} environment${validEnvironments.length !== 1 ? 's' : ''}</span>
            </div>
            <div class="tree-environments-container" style="display: none;"></div>
        `;
        
        const profileHeader = profileItem.querySelector('.tree-profile-header');
        const environmentsContainer = profileItem.querySelector('.tree-environments-container');
        
        // Populate environments
        validEnvironments.forEach(environment => {
            const environmentItem = createEnvironmentTreeItem(workbook, profile, environment);
            environmentsContainer.appendChild(environmentItem);
        });
        
        // Toggle profile expansion
        profileHeader.addEventListener('click', (e) => {
            if (!e.target.classList.contains('environment-radio')) {
                const isExpanded = environmentsContainer.style.display === 'block';
                environmentsContainer.style.display = isExpanded ? 'none' : 'block';
                const arrow = profileHeader.querySelector('.tree-arrow');
                arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(90deg)';
            }
        });
        
        return profileItem;
    }

    function createEnvironmentTreeItem(workbook, profile, environment) {
        const environmentItem = document.createElement('div');
        environmentItem.className = 'tree-environment-item';
        
        const tabCount = environment.tabs ? environment.tabs.length : 0;
        
        environmentItem.innerHTML = `
            <div class="tree-environment-option">
                <input type="radio" name="tab-destination" id="tab-dest-${environment.id}" value="${environment.id}" class="environment-radio">
                <label for="tab-dest-${environment.id}" class="tree-environment-label">
                    <i class="fas fa-folder environment-icon"></i>
                    <span class="tree-environment-name">${environment.name}</span>
                    <span class="tree-environment-info">${tabCount} tab${tabCount !== 1 ? 's' : ''}</span>
                </label>
            </div>
        `;
        
        const radio = environmentItem.querySelector('.environment-radio');
        radio.addEventListener('change', () => {
            if (radio.checked) {
                selectedDestinationEnvironment = environment;
                updateDestinationPathDisplay(workbook, profile, environment);
                
                // Uncheck other radios
                document.querySelectorAll('.environment-radio').forEach(otherRadio => {
                    if (otherRadio !== radio) {
                        otherRadio.checked = false;
                    }
                });
            }
        });
        
        return environmentItem;
    }

    function updateDestinationPathDisplay(workbook, profile, environment) {
        const pathElement = document.getElementById('move-tab-destination-path');
        if (!pathElement) return;
        
        pathElement.innerHTML = `
            <strong>Destination:</strong> 
            <span class="path-workbook">${workbook.name}</span> 
            <i class="fas fa-chevron-right"></i> 
            <span class="path-profile">${profile.name}</span> 
            <i class="fas fa-chevron-right"></i> 
            <span class="path-environment">${environment.name}</span>
        `;
        pathElement.style.display = 'block';
    }

    // Helper function to find which environment contains the tab
    function findEnvironmentContainingTab(tab, workbooks) {
        if (!workbooks || !tab) {
            console.error('No workbooks or tab provided');
            return null;
        }
        
        console.log('Searching for environment containing tab:', tab.id, tab.name);
        
        for (const workbook of workbooks) {
            for (const profile of workbook.profiles) {
                if (profile.environments && Array.isArray(profile.environments)) {
                    for (const environment of profile.environments) {
                        if (environment.tabs && Array.isArray(environment.tabs)) {
                            const foundTab = environment.tabs.find(t => t.id === tab.id);
                            if (foundTab) {
                                console.log('Found environment containing tab:', environment.name);
                                return environment;
                            }
                        }
                    }
                }
            }
        }
        
        console.log('No environment found containing tab');
        return null;
    }

    function saveMove() {
        if (tabToMove && selectedDestinationEnvironment) {
            console.log('Moving tab to destination:', selectedDestinationEnvironment.name);
            // Check if moveTab function exists
            if (typeof window.moveTab === 'function') {
                window.moveTab(tabToMove, selectedDestinationEnvironment);
                hideModal();
            } else {
                console.error('moveTab function not found');
                alert('Error: Move function not available');
            }
        } else {
            alert('Please select a destination environment');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMoveTabModal);
    } else {
        initMoveTabModal();
    }

    // Export to global scope
    window.openMoveTabModal = showModal;

})();