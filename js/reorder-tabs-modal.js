// js/reorder-tabs-modal.js

(function() {
    'use strict';
    
    let isInitialized = false;

    function initReorderTabsModal() {
        if (isInitialized) return;
        isInitialized = true;
        
        // Create modal if it doesn't exist
        if (!document.getElementById('reorder-tabs-modal')) {
            createModal();
        }
        setupEventListeners();
    }

    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'reorder-tabs-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="reorder-links-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Reorder Tabs</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <p>Change the order of tabs in the current environment:</p>
                <div class="reorder-links-list" id="reorder-tabs-list">
                    <!-- Tabs will be populated here -->
                </div>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-reorder-tabs-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-reorder-tabs-btn">Save Order</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    function setupEventListeners() {
        const modal = document.getElementById('reorder-tabs-modal');
        if (!modal) return;

        // Close modal events
        modal.querySelector('.close-modal').addEventListener('click', hideModal);
        modal.querySelector('#close-reorder-tabs-modal').addEventListener('click', hideModal);

        // Save reorder
        modal.querySelector('#save-reorder-tabs-btn').addEventListener('click', saveOrder);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }

    function showModal() {
        const modal = document.getElementById('reorder-tabs-modal');
        if (modal) {
            populateTabsList();
            modal.style.display = 'flex';
        }
    }

    function hideModal() {
        const modal = document.getElementById('reorder-tabs-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    function populateTabsList() {
        const listContainer = document.getElementById('reorder-tabs-list');
        if (!listContainer) return;
        
        if (!currentEnvironment) {
            listContainer.innerHTML = '<p>No environment selected</p>';
            return;
        }
        
        listContainer.innerHTML = '';

        currentEnvironment.tabs.forEach((tab, index) => {
            const tabItem = document.createElement('div');
            tabItem.className = 'reorder-link-item';
            tabItem.innerHTML = `
                <div class="reorder-link-handle">
                    <i class="fas fa-grip-vertical"></i>
                </div>
                <div class="reorder-link-info">
                    <div class="reorder-link-name">${tab.name}</div>
                    <div class="reorder-link-type">${tab.links.length} Link${tab.links.length !== 1 ? 's' : ''}</div>
                </div>
                <div class="reorder-link-actions">
                    <button class="move-up-btn" ${index === 0 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <button class="move-down-btn" ${index === currentEnvironment.tabs.length - 1 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            `;

            const moveUpBtn = tabItem.querySelector('.move-up-btn');
            const moveDownBtn = tabItem.querySelector('.move-down-btn');

            moveUpBtn.addEventListener('click', () => {
                if (index > 0) {
                    const temp = currentEnvironment.tabs[index];
                    currentEnvironment.tabs[index] = currentEnvironment.tabs[index - 1];
                    currentEnvironment.tabs[index - 1] = temp;
                    populateTabsList();
                }
            });

            moveDownBtn.addEventListener('click', () => {
                if (index < currentEnvironment.tabs.length - 1) {
                    const temp = currentEnvironment.tabs[index];
                    currentEnvironment.tabs[index] = currentEnvironment.tabs[index + 1];
                    currentEnvironment.tabs[index + 1] = temp;
                    populateTabsList();
                }
            });

            listContainer.appendChild(tabItem);
        });
    }

    function saveOrder() {
        saveWorkbooks();
        // Refresh the tabs display
        renderTabs();
        hideModal();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReorderTabsModal);
    } else {
        initReorderTabsModal();
    }

    // Export to global scope
    window.openReorderTabsModal = showModal;

})();