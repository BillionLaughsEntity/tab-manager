// js/rename-tab-modal.js

(function() {
    'use strict';
    
    let isInitialized = false;

    function initRenameTabModal() {
        if (isInitialized) return;
        isInitialized = true;
        
        // Create modal if it doesn't exist
        if (!document.getElementById('rename-tab-modal')) {
            createModal();
        }
        setupEventListeners();
    }

    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'rename-tab-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="rename-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Rename Tab</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <input type="text" class="rename-input" id="rename-tab-input" placeholder="Enter new name">
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-rename-tab-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-rename-tab-btn">Save</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    function setupEventListeners() {
        const modal = document.getElementById('rename-tab-modal');
        if (!modal) return;

        // Close modal events
        modal.querySelector('.close-modal').addEventListener('click', hideModal);
        modal.querySelector('#close-rename-tab-modal').addEventListener('click', hideModal);

        // Save rename
        modal.querySelector('#save-rename-tab-btn').addEventListener('click', saveRename);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });

        // Enter key support
        modal.querySelector('#rename-tab-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveRename();
            }
        });
    }

    function showModal(tab) {
        const modal = document.getElementById('rename-tab-modal');
        if (modal) {
            // Store the tab to rename globally
            window.tabToRename = tab;
            
            // Set current name in input
            const input = modal.querySelector('#rename-tab-input');
            input.value = tab.name;
            input.focus();
            input.select();
            
            modal.style.display = 'flex';
        }
    }

    function hideModal() {
        const modal = document.getElementById('rename-tab-modal');
        if (modal) {
            modal.style.display = 'none';
            window.tabToRename = null;
        }
    }

    function saveRename() {
        const modal = document.getElementById('rename-tab-modal');
        const input = modal.querySelector('#rename-tab-input');
        const newName = input.value.trim();
        
        if (newName && window.tabToRename) {
            // Check if renameTab function exists
            if (typeof renameTab === 'function') {
                renameTab(window.tabToRename, newName);
                hideModal();
            } else {
                console.error('renameTab function not found');
                alert('Error: Rename function not available');
            }
        } else if (!newName) {
            alert('Please enter a name');
            input.focus();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRenameTabModal);
    } else {
        initRenameTabModal();
    }

    // Export to global scope
    window.openRenameTabModal = showModal;

})();