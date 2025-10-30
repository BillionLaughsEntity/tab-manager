// js/reorder-profiles-modal.js

(function() {
    'use strict';
    
    let isInitialized = false;

    function initReorderProfilesModal() {
        if (isInitialized) return;
        isInitialized = true;
        
        // Create modal if it doesn't exist
        if (!document.getElementById('reorder-profiles-modal')) {
            createModal();
        }
        setupEventListeners();
    }

    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'reorder-profiles-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="reorder-links-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Reorder Profiles</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <p>Change the order of profiles in the current workbook:</p>
                <div class="reorder-links-list" id="reorder-profiles-list">
                    <!-- Profiles will be populated here -->
                </div>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-reorder-profiles-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-reorder-profiles-btn">Save Order</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    function setupEventListeners() {
        const modal = document.getElementById('reorder-profiles-modal');
        if (!modal) return;

        // Close modal events
        modal.querySelector('.close-modal').addEventListener('click', hideModal);
        modal.querySelector('#close-reorder-profiles-modal').addEventListener('click', hideModal);

        // Save reorder
        modal.querySelector('#save-reorder-profiles-btn').addEventListener('click', saveOrder);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }

    function showModal() {
        const modal = document.getElementById('reorder-profiles-modal');
        if (modal) {
            populateProfilesList();
            modal.style.display = 'flex';
        }
    }

    function hideModal() {
        const modal = document.getElementById('reorder-profiles-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    function populateProfilesList() {
        const listContainer = document.getElementById('reorder-profiles-list');
        if (!listContainer) return;
        
        const currentWorkbook = getCurrentWorkbook();
        if (!currentWorkbook) return;
        
        listContainer.innerHTML = '';

        currentWorkbook.profiles.forEach((profile, index) => {
            const profileItem = document.createElement('div');
            profileItem.className = 'reorder-link-item';
            profileItem.innerHTML = `
                <div class="reorder-link-handle">
                    <i class="fas fa-grip-vertical"></i>
                </div>
                <div class="reorder-link-name">${profile.name}</div>
                <div class="reorder-link-actions">
                    <button class="move-up-btn" ${index === 0 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <button class="move-down-btn" ${index === currentWorkbook.profiles.length - 1 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            `;

            const moveUpBtn = profileItem.querySelector('.move-up-btn');
            const moveDownBtn = profileItem.querySelector('.move-down-btn');

            moveUpBtn.addEventListener('click', () => {
                if (index > 0) {
                    const temp = currentWorkbook.profiles[index];
                    currentWorkbook.profiles[index] = currentWorkbook.profiles[index - 1];
                    currentWorkbook.profiles[index - 1] = temp;
                    populateProfilesList();
                }
            });

            moveDownBtn.addEventListener('click', () => {
                if (index < currentWorkbook.profiles.length - 1) {
                    const temp = currentWorkbook.profiles[index];
                    currentWorkbook.profiles[index] = currentWorkbook.profiles[index + 1];
                    currentWorkbook.profiles[index + 1] = temp;
                    populateProfilesList();
                }
            });

            listContainer.appendChild(profileItem);
        });
    }

    function saveOrder() {
        saveWorkbooks();
        renderProfileTabs();
        hideModal();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReorderProfilesModal);
    } else {
        initReorderProfilesModal();
    }

    // Export to global scope
    window.openReorderProfilesModal = showModal;

})();