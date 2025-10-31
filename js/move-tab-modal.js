// js/move-tab-modal.js

(function() {
    'use strict';
    
    let isInitialized = false;
    let tabToMove = null;
    let selectedDestinationEnvironment = null;

    function initMoveTabModal() {
        if (isInitialized) return;
        isInitialized = true;
        
        // Create modal if it doesn't exist
        if (!document.getElementById('move-tab-modal')) {
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
                <div id="move-tab-destinations">
                    <!-- Destinations will be populated here -->
                </div>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-move-tab-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-move-tab-btn">Move</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    function setupEventListeners() {
        const modal = document.getElementById('move-tab-modal');
        if (!modal) return;

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
        const modal = document.getElementById('move-tab-modal');
        if (modal) {
            console.log('=== MOVE TAB MODAL OPENED ===');
            console.log('Tab to move:', tab);
            console.log('Available workbooks:', getWorkbooks());
            
            tabToMove = tab;
            selectedDestinationEnvironment = null;
            
            populateDestinations(tab);
            modal.style.display = 'flex';
        }
    }

    function hideModal() {
        const modal = document.getElementById('move-tab-modal');
        if (modal) {
            modal.style.display = 'none';
            tabToMove = null;
            selectedDestinationEnvironment = null;
        }
    }

    // Helper function to safely access workbooks
    function getWorkbooks() {
        // Try multiple ways to access workbooks
        if (window.workbooks) return window.workbooks;
        if (typeof workbooks !== 'undefined') return workbooks;
        console.error('Workbooks not found in global scope');
        return [];
    }

    // Helper function to safely access current environment
    function getCurrentEnvironment() {
        if (window.currentEnvironment) return window.currentEnvironment;
        if (typeof currentEnvironment !== 'undefined') return currentEnvironment;
        return null;
    }

    function populateDestinations(tab) {
        const destinationsContainer = document.getElementById('move-tab-destinations');
        if (!destinationsContainer) return;
        
        destinationsContainer.innerHTML = '';
        
        // Get current environment from the tab's context
        const currentEnvironment = findEnvironmentContainingTab(tab);
        const workbooks = getWorkbooks();
        
        console.log('Current environment:', currentEnvironment);
        console.log('All workbooks:', workbooks);
        
        let hasDestinations = false;
        
        // Show all environments from ALL profiles and workbooks except the current environment
        if (workbooks && Array.isArray(workbooks)) {
            workbooks.forEach(workbook => {
                workbook.profiles.forEach(profile => {
                    profile.environments.forEach(environment => {
                        // Skip the current environment (if found)
                        const isCurrentEnvironment = currentEnvironment && environment.id === currentEnvironment.id;
                        console.log(`Environment: ${environment.name}, IsCurrent: ${isCurrentEnvironment}`);
                        
                        if (!isCurrentEnvironment) {
                            hasDestinations = true;
                            
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
                                    console.log('Selected destination environment:', environment.name);
                                }
                            });
                            
                            destinationsContainer.appendChild(destinationItem);
                        }
                    });
                });
            });
        }
        
        // If no other environments exist, show message
        if (!hasDestinations) {
            console.log('No destinations found - showing message');
            destinationsContainer.innerHTML = '<p class="no-destinations">No other environments available for moving tabs.</p>';
        } else {
            console.log('Destinations populated successfully');
        }
    }

    // Helper function to find which environment contains the tab
    function findEnvironmentContainingTab(tab) {
        const workbooks = getWorkbooks();
        
        if (!workbooks || !tab || !Array.isArray(workbooks)) {
            console.log('No workbooks or tab provided:', { workbooks, tab });
            return null;
        }
        
        console.log('Looking for environment containing tab:', tab.name, tab.id);
        
        for (const workbook of workbooks) {
            for (const profile of workbook.profiles) {
                for (const environment of profile.environments) {
                    if (environment.tabs && environment.tabs.some(t => t && t.id === tab.id)) {
                        console.log('Found environment:', environment.name);
                        return environment;
                    }
                }
            }
        }
        
        console.log('Environment not found for tab');
        return null;
    }

    function saveMove() {
        if (tabToMove && selectedDestinationEnvironment) {
            console.log('Moving tab:', tabToMove.name, 'to environment:', selectedDestinationEnvironment.name);
            
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
            console.log('Missing tabToMove or selectedDestinationEnvironment:', {tabToMove, selectedDestinationEnvironment});
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