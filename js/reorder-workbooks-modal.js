// js/reorder-workbooks-modal.js

// Use an IIFE to avoid global pollution
(function() {
    'use strict';
    
    let isInitialized = false;

    function initReorderWorkbooksModal() {
        if (isInitialized) return;
        isInitialized = true;
        
        // Create modal if it doesn't exist
        if (!document.getElementById('reorder-workbooks-modal')) {
            createModal();
        }
        setupEventListeners();
    }

    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'reorder-workbooks-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="reorder-links-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Reorder Workbooks</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <p>Change the order of workbooks:</p>
                <div class="reorder-links-list" id="reorder-workbooks-list">
                    <!-- Workbooks will be populated here -->
                </div>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-reorder-workbooks-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-reorder-workbooks-btn">Save Order</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    function setupEventListeners() {
        const modal = document.getElementById('reorder-workbooks-modal');
        if (!modal) return;

        // Close modal events
        modal.querySelector('.close-modal').addEventListener('click', hideModal);
        modal.querySelector('#close-reorder-workbooks-modal').addEventListener('click', hideModal);

        // Save reorder
        modal.querySelector('#save-reorder-workbooks-btn').addEventListener('click', saveOrder);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }

    function showModal() {
        const modal = document.getElementById('reorder-workbooks-modal');
        if (modal) {
            populateWorkbooksList();
            modal.style.display = 'flex';
        }
    }

    function hideModal() {
        const modal = document.getElementById('reorder-workbooks-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    function populateWorkbooksList() {
        const listContainer = document.getElementById('reorder-workbooks-list');
        if (!listContainer) return;
        
        listContainer.innerHTML = '';

        workbooks.forEach((workbook, index) => {
            const workbookItem = document.createElement('div');
            workbookItem.className = 'reorder-link-item';
            workbookItem.innerHTML = `
                <div class="reorder-link-handle">
                    <i class="fas fa-grip-vertical"></i>
                </div>
                <div class="reorder-link-name">${workbook.name}</div>
                <div class="reorder-link-actions">
                    <button class="move-up-btn" ${index === 0 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <button class="move-down-btn" ${index === workbooks.length - 1 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            `;

            const moveUpBtn = workbookItem.querySelector('.move-up-btn');
            const moveDownBtn = workbookItem.querySelector('.move-down-btn');

            moveUpBtn.addEventListener('click', () => {
                if (index > 0) {
                    const temp = workbooks[index];
                    workbooks[index] = workbooks[index - 1];
                    workbooks[index - 1] = temp;
                    populateWorkbooksList();
                }
            });

            moveDownBtn.addEventListener('click', () => {
                if (index < workbooks.length - 1) {
                    const temp = workbooks[index];
                    workbooks[index] = workbooks[index + 1];
                    workbooks[index + 1] = temp;
                    populateWorkbooksList();
                }
            });

            listContainer.appendChild(workbookItem);
        });
    }

    function saveOrder() {
        saveWorkbooks();
        renderWorkbookTabs();
        hideModal();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReorderWorkbooksModal);
    } else {
        initReorderWorkbooksModal();
    }

    // Export to global scope
    window.openReorderWorkbooksModal = showModal;

})();