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
                
                <div id="move-tab-destinations">
                    <!-- Destinations will be populated here -->
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

        console.log('Setting up move tab modal event listeners');

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
            
            populateDestinations(tab);
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

    function populateDestinations(tab) {
        const destinationsContainer = document.getElementById('move-tab-destinations');
        if (!destinationsContainer) {
            console.error('Destinations container not found!');
            return;
        }
        
        console.log('Populating destinations for tab:', tab);
        
        // Get workbooks data - try multiple ways to access it
        const workbooks = getWorkbooksData();
        console.log('Workbooks data found:', workbooks);
        
        destinationsContainer.innerHTML = '';
        
        // Get current environment from the tab's context
        const currentEnvironment = findEnvironmentContainingTab(tab, workbooks);
        console.log('Current environment containing tab:', currentEnvironment);
        
        let hasDestinations = false;
        let totalEnvironments = 0;
        let skippedEnvironments = 0;
        
        // Show ALL environments from ALL workbooks and profiles
        if (workbooks && Array.isArray(workbooks)) {
            console.log('Found workbooks:', workbooks.length);
            
            workbooks.forEach(workbook => {
                console.log('Processing workbook:', workbook.name, 'with profiles:', workbook.profiles.length);
                
                workbook.profiles.forEach(profile => {
                    console.log('Processing profile:', profile.name, 'with environments:', profile.environments.length);
                    
                    if (profile.environments && Array.isArray(profile.environments)) {
                        profile.environments.forEach(environment => {
                            totalEnvironments++;
                            console.log('Processing environment:', environment.name, 'ID:', environment.id);
                            
                            // Skip the current environment (if found)
                            const isCurrentEnvironment = currentEnvironment && environment.id === currentEnvironment.id;
                            
                            if (!isCurrentEnvironment) {
                                hasDestinations = true;
                                console.log('Adding environment as destination:', environment.name);
                                
                                const destinationItem = document.createElement('div');
                                destinationItem.className = 'destination-item';
                                destinationItem.innerHTML = `
                                    <input type="radio" name="tab-destination" id="tab-dest-${environment.id}" value="${environment.id}">
                                    <label for="tab-dest-${environment.id}">
                                        <div class="destination-header">
                                            <strong>${environment.name}</strong>
                                            <div class="destination-badges">
                                                <span class="profile-badge">${profile.name}</span>
                                                <span class="workbook-badge">${workbook.name}</span>
                                            </div>
                                        </div>
                                        <div class="destination-info">
                                            ${environment.tabs ? environment.tabs.length : 0} tab${environment.tabs && environment.tabs.length !== 1 ? 's' : ''}
                                        </div>
                                    </label>
                                `;
                                
                                const radio = destinationItem.querySelector('input[type="radio"]');
                                radio.addEventListener('change', () => {
                                    if (radio.checked) {
                                        selectedDestinationEnvironment = environment;
                                        updateDestinationPathDisplay(workbook, profile, environment);
                                    }
                                });
                                
                                destinationsContainer.appendChild(destinationItem);
                            } else {
                                skippedEnvironments++;
                                console.log('Skipping current environment:', environment.name);
                            }
                        });
                    } else {
                        console.log('Profile has no environments array:', profile.name);
                    }
                });
            });
        } else {
            console.error('No workbooks found or workbooks is not an array!');
        }
        
        console.log(`Total environments: ${totalEnvironments}, Skipped: ${skippedEnvironments}, Has destinations: ${hasDestinations}`);
        
        // If no other environments exist, show message
        if (!hasDestinations) {
            console.log('No destinations found, showing message');
            destinationsContainer.innerHTML = `
                <div class="no-destinations">
                    <p>No other environments available for moving tabs.</p>
                    <p><small>Debug info: Found ${totalEnvironments} total environments, skipped ${skippedEnvironments} as current environment</small></p>
                    <p><small>Workbooks count: ${workbooks ? workbooks.length : 0}</small></p>
                </div>
            `;
        } else {
            console.log(`Found ${hasDestinations} destination environments`);
        }
    }

    // Helper function to get workbooks data from various sources
    function getWorkbooksData() {
        // Try multiple ways to access the workbooks data
        if (window.workbooks && Array.isArray(window.workbooks)) {
            console.log('Found workbooks in window.workbooks');
            return window.workbooks;
        }
        
        // Try to get it from the main app context
        try {
            if (typeof getCurrentWorkbook === 'function') {
                const currentWorkbook = getCurrentWorkbook();
                if (currentWorkbook) {
                    console.log('Found current workbook, but need all workbooks');
                    // We need all workbooks, not just current
                }
            }
        } catch (e) {
            console.log('Error getting current workbook:', e);
        }
        
        // Try localStorage as last resort
        try {
            const versionedData = localStorage.getItem('tabManagerData_v18-search');
            if (versionedData) {
                const parsed = JSON.parse(versionedData);
                if (parsed && parsed.workbooks) {
                    console.log('Found workbooks in localStorage');
                    return parsed.workbooks;
                }
            }
        } catch (e) {
            console.log('Error reading from localStorage:', e);
        }
        
        console.error('Could not find workbooks data from any source');
        return null;
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
            console.error('No workbooks or tab provided to findEnvironmentContainingTab');
            return null;
        }
        
        console.log('Searching for environment containing tab:', tab.id, tab.name);
        console.log('Searching in workbooks:', workbooks.length);
        
        for (const workbook of workbooks) {
            for (const profile of workbook.profiles) {
                if (profile.environments && Array.isArray(profile.environments)) {
                    for (const environment of profile.environments) {
                        if (environment.tabs && Array.isArray(environment.tabs)) {
                            const foundTab = environment.tabs.find(t => t.id === tab.id);
                            if (foundTab) {
                                console.log('Found environment containing tab:', environment.name, 'in profile:', profile.name, 'workbook:', workbook.name);
                                return environment;
                            }
                        }
                    }
                }
            }
        }
        
        console.log('No environment found containing tab:', tab.id, tab.name);
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