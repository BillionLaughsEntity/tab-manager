// js/move-profile-modal.js

(function() {
    'use strict';
    
    let isInitialized = false;

    function initMoveProfileModal() {
        if (isInitialized) return;
        isInitialized = true;
        
        // Create modal if it doesn't exist
        if (!document.getElementById('move-profile-modal')) {
            createModal();
        }
        setupEventListeners();
    }

    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'move-profile-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="move-tab-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Move Profile</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <p>Select a destination workbook for this profile:</p>
                <div id="move-profile-destinations">
                    <!-- Destinations will be populated here -->
                </div>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-move-profile-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-move-profile-btn">Move</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    function setupEventListeners() {
        const modal = document.getElementById('move-profile-modal');
        if (!modal) return;

        // Close modal events
        modal.querySelector('.close-modal').addEventListener('click', hideModal);
        modal.querySelector('#close-move-profile-modal').addEventListener('click', hideModal);

        // Save move
        modal.querySelector('#save-move-profile-btn').addEventListener('click', saveMove);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }

    function showModal(profile) {
        const modal = document.getElementById('move-profile-modal');
        if (modal) {
            // Store the profile to move globally
            window.profileToMove = profile;
            window.selectedDestinationWorkbook = null;
            
            populateDestinations();
            modal.style.display = 'flex';
        }
    }

    function hideModal() {
        const modal = document.getElementById('move-profile-modal');
        if (modal) {
            modal.style.display = 'none';
            window.profileToMove = null;
            window.selectedDestinationWorkbook = null;
        }
    }

    function populateDestinations() {
        const destinationsContainer = document.getElementById('move-profile-destinations');
        if (!destinationsContainer) return;
        
        destinationsContainer.innerHTML = '';
        
        // Get current workbook (the one we're moving FROM)
        const currentWorkbook = getCurrentWorkbook();
        
        // Show all workbooks except the current one
        workbooks.forEach(workbook => {
            if (workbook.id !== currentWorkbook.id) {
                const destinationItem = document.createElement('div');
                destinationItem.className = 'destination-item';
                destinationItem.innerHTML = `
                    <input type="radio" name="profile-destination" id="profile-dest-${workbook.id}" value="${workbook.id}">
                    <label for="profile-dest-${workbook.id}">
                        <strong>${workbook.name}</strong>
                        <span class="destination-info">${workbook.profiles.length} profile${workbook.profiles.length !== 1 ? 's' : ''}</span>
                    </label>
                `;
                
                const radio = destinationItem.querySelector('input[type="radio"]');
                radio.addEventListener('change', () => {
                    if (radio.checked) {
                        window.selectedDestinationWorkbook = workbook;
                    }
                });
                
                destinationsContainer.appendChild(destinationItem);
            }
        });
        
        // If no other workbooks exist, show message
        if (destinationsContainer.children.length === 0) {
            destinationsContainer.innerHTML = '<p class="no-destinations">No other workbooks available for moving profiles.</p>';
        }
    }

    function saveMove() {
        if (window.profileToMove && window.selectedDestinationWorkbook) {
            // Check if moveProfile function exists
            if (typeof moveProfile === 'function') {
                moveProfile(window.profileToMove, window.selectedDestinationWorkbook);
                hideModal();
            } else {
                console.error('moveProfile function not found');
                alert('Error: Move function not available');
            }
        } else {
            alert('Please select a destination workbook');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMoveProfileModal);
    } else {
        initMoveProfileModal();
    }

    // Export to global scope
    window.openMoveProfileModal = showModal;

})();