// js/rename-workbook-modal.js

(function() {
    'use strict';
    
    let isInitialized = false;

    function initRenameWorkbookModal() {
        if (isInitialized) return;
        isInitialized = true;
        
        // Create modal if it doesn't exist
        if (!document.getElementById('rename-workbook-modal')) {
            createModal();
        }
        setupEventListeners();
    }

    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'rename-workbook-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="rename-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Rename Workbook</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <input type="text" class="rename-input" id="rename-workbook-input" placeholder="Enter new name">
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-rename-workbook-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-rename-workbook-btn">Save</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    function setupEventListeners() {
        const modal = document.getElementById('rename-workbook-modal');
        if (!modal) return;

        // Close modal events
        modal.querySelector('.close-modal').addEventListener('click', hideModal);
        modal.querySelector('#close-rename-workbook-modal').addEventListener('click', hideModal);

        // Save rename
        modal.querySelector('#save-rename-workbook-btn').addEventListener('click', saveRename);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });

        // Enter key support
        modal.querySelector('#rename-workbook-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveRename();
            }
        });
    }

    function showModal(workbook) {
        const modal = document.getElementById('rename-workbook-modal');
        if (modal) {
            // Store the workbook to rename globally
            window.workbookToRename = workbook;
            
            // Set current name in input
            const input = modal.querySelector('#rename-workbook-input');
            input.value = workbook.name;
            input.focus();
            input.select();
            
            modal.style.display = 'flex';
        }
    }

    function hideModal() {
        const modal = document.getElementById('rename-workbook-modal');
        if (modal) {
            modal.style.display = 'none';
            window.workbookToRename = null;
        }
    }

    function saveRename() {
        const modal = document.getElementById('rename-workbook-modal');
        const input = modal.querySelector('#rename-workbook-input');
        const newName = input.value.trim();
        
        if (newName && window.workbookToRename) {
            renameWorkbook(window.workbookToRename, newName);
            hideModal();
        } else if (!newName) {
            alert('Please enter a name');
            input.focus();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRenameWorkbookModal);
    } else {
        initRenameWorkbookModal();
    }

    // Export to global scope
    window.openRenameWorkbookModal = showModal;

})();