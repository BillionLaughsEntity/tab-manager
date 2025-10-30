// js/move-tab-modal.js

(function() {
    'use strict';
    
    let isInitialized = false;

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
            // Store the tab to move globally
            window.tabToMove = tab;
            window.selectedDestinationEnvironment = null;
            
            populateDestinations(tab);
            modal.style.display = 'flex';
        }
    }

    function hideModal() {
        const modal = document.getElementById('move-tab-modal');
        if (modal) {
            modal.style.display = 'none';
            window.tabToMove = null;
            window.selectedDestinationEnvironment = null;
        }
    }

    function populateDestinations(tab) {
        const destinationsContainer = document.getElementById('move-tab-destinations');
        if (!destinationsContainer) return;
        
        destinationsContainer.innerHTML = '';
        
        // Get current environment from the tab's context
        const currentEnvironment = findEnvironmentContainingTab(tab);
        const currentProfile = window.getCurrentProfile ? window.getCurrentProfile() : null;
        const currentWorkbook = window.getCurrentWorkbook ? window.getCurrentWorkbook() : null;
        
        let hasDestinations = false;
        
        // Show all environments from ALL profiles and workbooks except the current environment
        if (window.workbooks && Array.isArray(window.workbooks)) {
            window.workbooks.forEach(workbook => {
                workbook.profiles.forEach(profile => {
                    profile.environments.forEach(environment => {
                        // Skip the current environment (if found)
                        if (!currentEnvironment || environment.id !== currentEnvironment.id) {
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
                                    window.selectedDestinationEnvironment = environment;
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
            destinationsContainer.innerHTML = '<p class="no-destinations">No other environments available for moving tabs.</p>';
        }
    }

    // Helper function to find which environment contains the tab
    function findEnvironmentContainingTab(tab) {
        if (!window.workbooks || !tab) return null;
        
        for (const workbook of window.workbooks) {
            for (const profile of workbook.profiles) {
                for (const environment of profile.environments) {
                    if (environment.tabs && environment.tabs.some(t => t.id === tab.id)) {
                        return environment;
                    }
                }
            }
        }
        return null;
    }

    function saveMove() {
        if (window.tabToMove && window.selectedDestinationEnvironment) {
            // Check if moveTab function exists
            if (typeof window.moveTab === 'function') {
                window.moveTab(window.tabToMove, window.selectedDestinationEnvironment);
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