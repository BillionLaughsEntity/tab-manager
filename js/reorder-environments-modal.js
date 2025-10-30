// js/reorder-environments-modal.js

(function() {
    'use strict';
    
    let isInitialized = false;

    function initReorderEnvironmentsModal() {
        if (isInitialized) return;
        isInitialized = true;
        
        // Create modal if it doesn't exist
        if (!document.getElementById('reorder-environments-modal')) {
            createModal();
        }
        setupEventListeners();
    }

    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'reorder-environments-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="reorder-links-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Reorder Environments</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <p>Change the order of environments in the current profile:</p>
                <div class="reorder-links-list" id="reorder-environments-list">
                    <!-- Environments will be populated here -->
                </div>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-reorder-environments-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-reorder-environments-btn">Save Order</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    function setupEventListeners() {
        const modal = document.getElementById('reorder-environments-modal');
        if (!modal) return;

        // Close modal events
        modal.querySelector('.close-modal').addEventListener('click', hideModal);
        modal.querySelector('#close-reorder-environments-modal').addEventListener('click', hideModal);

        // Save reorder
        modal.querySelector('#save-reorder-environments-btn').addEventListener('click', saveOrder);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }

    function showModal() {
        const modal = document.getElementById('reorder-environments-modal');
        if (modal) {
            populateEnvironmentsList();
            modal.style.display = 'flex';
        }
    }

    function hideModal() {
        const modal = document.getElementById('reorder-environments-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    function populateEnvironmentsList() {
        const listContainer = document.getElementById('reorder-environments-list');
        if (!listContainer) return;
        
        const currentProfile = getCurrentProfile();
        if (!currentProfile) {
            listContainer.innerHTML = '<p>No profile selected</p>';
            return;
        }
        
        listContainer.innerHTML = '';

        currentProfile.environments.forEach((environment, index) => {
            const environmentItem = document.createElement('div');
            environmentItem.className = 'reorder-link-item';
            environmentItem.innerHTML = `
                <div class="reorder-link-handle">
                    <i class="fas fa-grip-vertical"></i>
                </div>
                <div class="reorder-link-info">
                    <div class="reorder-link-name">${environment.name}</div>
                    <div class="reorder-link-type">${environment.tabs.length} Tab${environment.tabs.length !== 1 ? 's' : ''}</div>
                </div>
                <div class="reorder-link-actions">
                    <button class="move-up-btn" ${index === 0 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <button class="move-down-btn" ${index === currentProfile.environments.length - 1 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            `;

            const moveUpBtn = environmentItem.querySelector('.move-up-btn');
            const moveDownBtn = environmentItem.querySelector('.move-down-btn');

            moveUpBtn.addEventListener('click', () => {
                if (index > 0) {
                    const temp = currentProfile.environments[index];
                    currentProfile.environments[index] = currentProfile.environments[index - 1];
                    currentProfile.environments[index - 1] = temp;
                    populateEnvironmentsList();
                }
            });

            moveDownBtn.addEventListener('click', () => {
                if (index < currentProfile.environments.length - 1) {
                    const temp = currentProfile.environments[index];
                    currentProfile.environments[index] = currentProfile.environments[index + 1];
                    currentProfile.environments[index + 1] = temp;
                    populateEnvironmentsList();
                }
            });

            listContainer.appendChild(environmentItem);
        });
    }

    function saveOrder() {
        saveWorkbooks();
        // Refresh the environments display
        renderEnvironments();
        hideModal();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReorderEnvironmentsModal);
    } else {
        initReorderEnvironmentsModal();
    }

    // Export to global scope
    window.openReorderEnvironmentsModal = showModal;

})();