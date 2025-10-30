// js/move-environment-modal.js

(function() {
    'use strict';
    
    let isInitialized = false;

    function initMoveEnvironmentModal() {
        if (isInitialized) return;
        isInitialized = true;
        
        // Create modal if it doesn't exist
        if (!document.getElementById('move-environment-modal')) {
            createModal();
        }
        setupEventListeners();
    }

    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'move-environment-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="move-tab-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Move Environment</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <p>Select a destination profile for this environment:</p>
                <div id="move-environment-destinations">
                    <!-- Destinations will be populated here -->
                </div>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-move-environment-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-move-environment-btn">Move</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    function setupEventListeners() {
        const modal = document.getElementById('move-environment-modal');
        if (!modal) return;

        // Close modal events
        modal.querySelector('.close-modal').addEventListener('click', hideModal);
        modal.querySelector('#close-move-environment-modal').addEventListener('click', hideModal);

        // Save move
        modal.querySelector('#save-move-environment-btn').addEventListener('click', saveMove);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }

    function showModal(environment) {
        const modal = document.getElementById('move-environment-modal');
        if (modal) {
            // Store the environment to move globally
            window.environmentToMove = environment;
            window.selectedDestinationProfile = null;
            
            populateDestinations();
            modal.style.display = 'flex';
        }
    }

    function hideModal() {
        const modal = document.getElementById('move-environment-modal');
        if (modal) {
            modal.style.display = 'none';
            window.environmentToMove = null;
            window.selectedDestinationProfile = null;
        }
    }

    function populateDestinations() {
        const destinationsContainer = document.getElementById('move-environment-destinations');
        if (!destinationsContainer) return;
        
        destinationsContainer.innerHTML = '';
        
        // Get current profile (the one we're moving FROM)
        const currentProfile = getCurrentProfile();
        const currentWorkbook = getCurrentWorkbook();
        
        // Show all profiles in the current workbook except the current one
        currentWorkbook.profiles.forEach(profile => {
            if (profile.id !== currentProfile.id) {
                const destinationItem = document.createElement('div');
                destinationItem.className = 'destination-item';
                destinationItem.innerHTML = `
                    <input type="radio" name="environment-destination" id="environment-dest-${profile.id}" value="${profile.id}">
                    <label for="environment-dest-${profile.id}">
                        <strong>${profile.name}</strong>
                        <span class="destination-info">${profile.environments.length} environment${profile.environments.length !== 1 ? 's' : ''}</span>
                    </label>
                `;
                
                const radio = destinationItem.querySelector('input[type="radio"]');
                radio.addEventListener('change', () => {
                    if (radio.checked) {
                        window.selectedDestinationProfile = profile;
                    }
                });
                
                destinationsContainer.appendChild(destinationItem);
            }
        });
        
        // If no other profiles exist, show message
        if (destinationsContainer.children.length === 0) {
            destinationsContainer.innerHTML = '<p class="no-destinations">No other profiles available for moving environments.</p>';
        }
    }

    function saveMove() {
        if (window.environmentToMove && window.selectedDestinationProfile) {
            // Check if moveEnvironment function exists
            if (typeof moveEnvironment === 'function') {
                moveEnvironment(window.environmentToMove, window.selectedDestinationProfile);
                hideModal();
            } else {
                console.error('moveEnvironment function not found');
                alert('Error: Move function not available');
            }
        } else {
            alert('Please select a destination profile');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMoveEnvironmentModal);
    } else {
        initMoveEnvironmentModal();
    }

    // Export to global scope
    window.openMoveEnvironmentModal = showModal;

})();