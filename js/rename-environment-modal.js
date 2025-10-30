// js/rename-environment-modal.js

(function() {
    'use strict';
    
    let isInitialized = false;

    function initRenameEnvironmentModal() {
        if (isInitialized) return;
        isInitialized = true;
        
        // Create modal if it doesn't exist
        if (!document.getElementById('rename-environment-modal')) {
            createModal();
        }
        setupEventListeners();
    }

    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'rename-environment-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="rename-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Rename Environment</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <input type="text" class="rename-input" id="rename-environment-input" placeholder="Enter new name">
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-rename-environment-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-rename-environment-btn">Save</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    function setupEventListeners() {
        const modal = document.getElementById('rename-environment-modal');
        if (!modal) return;

        // Close modal events
        modal.querySelector('.close-modal').addEventListener('click', hideModal);
        modal.querySelector('#close-rename-environment-modal').addEventListener('click', hideModal);

        // Save rename
        modal.querySelector('#save-rename-environment-btn').addEventListener('click', saveRename);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });

        // Enter key support
        modal.querySelector('#rename-environment-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveRename();
            }
        });
    }

    function showModal(environment) {
        const modal = document.getElementById('rename-environment-modal');
        if (modal) {
            // Store the environment to rename globally
            window.environmentToRename = environment;
            
            // Set current name in input
            const input = modal.querySelector('#rename-environment-input');
            input.value = environment.name;
            input.focus();
            input.select();
            
            modal.style.display = 'flex';
        }
    }

    function hideModal() {
        const modal = document.getElementById('rename-environment-modal');
        if (modal) {
            modal.style.display = 'none';
            window.environmentToRename = null;
        }
    }

    function saveRename() {
        const modal = document.getElementById('rename-environment-modal');
        const input = modal.querySelector('#rename-environment-input');
        const newName = input.value.trim();
        
        if (newName && window.environmentToRename) {
            // Check if renameEnvironment function exists
            if (typeof renameEnvironment === 'function') {
                renameEnvironment(window.environmentToRename, newName);
                hideModal();
            } else {
                console.error('renameEnvironment function not found');
                alert('Error: Rename function not available');
            }
        } else if (!newName) {
            alert('Please enter a name');
            input.focus();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRenameEnvironmentModal);
    } else {
        initRenameEnvironmentModal();
    }

    // Export to global scope
    window.openRenameEnvironmentModal = showModal;

})();