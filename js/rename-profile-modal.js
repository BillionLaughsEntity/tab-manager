// js/rename-profile-modal.js

(function() {
    'use strict';
    
    let isInitialized = false;

    function initRenameProfileModal() {
        if (isInitialized) return;
        isInitialized = true;
        
        // Create modal if it doesn't exist
        if (!document.getElementById('rename-profile-modal')) {
            createModal();
        }
        setupEventListeners();
    }

    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'rename-profile-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="rename-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Rename Profile</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <input type="text" class="rename-input" id="rename-profile-input" placeholder="Enter new name">
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-rename-profile-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-rename-profile-btn">Save</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    function setupEventListeners() {
        const modal = document.getElementById('rename-profile-modal');
        if (!modal) return;

        // Close modal events
        modal.querySelector('.close-modal').addEventListener('click', hideModal);
        modal.querySelector('#close-rename-profile-modal').addEventListener('click', hideModal);

        // Save rename
        modal.querySelector('#save-rename-profile-btn').addEventListener('click', saveRename);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });

        // Enter key support
        modal.querySelector('#rename-profile-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveRename();
            }
        });
    }

    function showModal(profile) {
        const modal = document.getElementById('rename-profile-modal');
        if (modal) {
            // Store the profile to rename globally
            window.profileToRename = profile;
            
            // Set current name in input
            const input = modal.querySelector('#rename-profile-input');
            input.value = profile.name;
            input.focus();
            input.select();
            
            modal.style.display = 'flex';
        }
    }

    function hideModal() {
        const modal = document.getElementById('rename-profile-modal');
        if (modal) {
            modal.style.display = 'none';
            window.profileToRename = null;
        }
    }

    function saveRename() {
        const modal = document.getElementById('rename-profile-modal');
        const input = modal.querySelector('#rename-profile-input');
        const newName = input.value.trim();
        
        if (newName && window.profileToRename) {
            // Check if renameProfile function exists
            if (typeof renameProfile === 'function') {
                renameProfile(window.profileToRename, newName);
                hideModal();
            } else {
                console.error('renameProfile function not found');
                alert('Error: Rename function not available');
            }
        } else if (!newName) {
            alert('Please enter a name');
            input.focus();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRenameProfileModal);
    } else {
        initRenameProfileModal();
    }

    // Export to global scope
    window.openRenameProfileModal = showModal;

})();