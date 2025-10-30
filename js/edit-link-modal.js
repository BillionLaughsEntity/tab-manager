// js/edit-link-modal.js

(function() {
    'use strict';
    
    let isInitialized = false;

    function initEditLinkModal() {
        if (isInitialized) return;
        isInitialized = true;
        
        // Create modal if it doesn't exist
        if (!document.getElementById('edit-link-modal')) {
            createModal();
        }
        setupEventListeners();
    }

    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'edit-link-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="rename-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Edit Link</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <input type="text" class="rename-input" id="edit-link-title" placeholder="Enter link title">
                <input type="text" class="rename-input" id="edit-link-url" placeholder="https://example.com">
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-edit-link-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-edit-link-btn">Save</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    function setupEventListeners() {
        const modal = document.getElementById('edit-link-modal');
        if (!modal) return;

        // Close modal events
        modal.querySelector('.close-modal').addEventListener('click', hideModal);
        modal.querySelector('#close-edit-link-modal').addEventListener('click', hideModal);

        // Save edit
        modal.querySelector('#save-edit-link-btn').addEventListener('click', saveEdit);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });

        // Enter key support (save when Enter is pressed in either input)
        modal.querySelectorAll('.rename-input').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveEdit();
                }
            });
        });
    }

    function showModal(link) {
        const modal = document.getElementById('edit-link-modal');
        if (modal) {
            // Store the link to edit globally
            window.linkToEdit = link;
            
            // Set current values in inputs
            const titleInput = modal.querySelector('#edit-link-title');
            const urlInput = modal.querySelector('#edit-link-url');
            
            titleInput.value = link.title || '';
            urlInput.value = link.url || '';
            
            titleInput.focus();
            titleInput.select();
            
            modal.style.display = 'flex';
        }
    }

    function hideModal() {
        const modal = document.getElementById('edit-link-modal');
        if (modal) {
            modal.style.display = 'none';
            window.linkToEdit = null;
        }
    }

    function saveEdit() {
        const modal = document.getElementById('edit-link-modal');
        const titleInput = modal.querySelector('#edit-link-title');
        const urlInput = modal.querySelector('#edit-link-url');
        
        const newTitle = titleInput.value.trim();
        const newUrl = urlInput.value.trim();
        
        if (newTitle && newUrl && window.linkToEdit) {
            // Validate URL format
            if (typeof isValidUrl === 'function' && !isValidUrl(newUrl)) {
                alert('Please enter a valid URL (e.g., https://example.com)');
                urlInput.focus();
                return;
            }
            
            // Check if editLink function exists
            if (typeof editLink === 'function') {
                editLink(window.linkToEdit, newTitle, newUrl);
                hideModal();
            } else {
                console.error('editLink function not found');
                alert('Error: Edit function not available');
            }
        } else {
            if (!newTitle) {
                alert('Please enter a title');
                titleInput.focus();
            } else if (!newUrl) {
                alert('Please enter a URL');
                urlInput.focus();
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEditLinkModal);
    } else {
        initEditLinkModal();
    }

    // Export to global scope
    window.openEditLinkModal = showModal;

})();