// js/reorder-links-modal.js

(function() {
    'use strict';
    
    let isInitialized = false;

    function initReorderLinksModal() {
        if (isInitialized) return;
        isInitialized = true;
        
        // Create modal if it doesn't exist
        if (!document.getElementById('reorder-links-modal')) {
            createModal();
        }
        setupEventListeners();
    }

    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'reorder-links-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="reorder-links-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Reorder Links</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <p>Change the order of links in the current tab:</p>
                <div class="reorder-links-list" id="reorder-links-list">
                    <!-- Links will be populated here -->
                </div>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-reorder-links-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-reorder-links-btn">Save Order</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    function setupEventListeners() {
        const modal = document.getElementById('reorder-links-modal');
        if (!modal) return;

        // Close modal events
        modal.querySelector('.close-modal').addEventListener('click', hideModal);
        modal.querySelector('#close-reorder-links-modal').addEventListener('click', hideModal);

        // Save reorder
        modal.querySelector('#save-reorder-links-btn').addEventListener('click', saveOrder);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }

    function showModal() {
        const modal = document.getElementById('reorder-links-modal');
        if (modal) {
            populateLinksList();
            modal.style.display = 'flex';
        }
    }

    function hideModal() {
        const modal = document.getElementById('reorder-links-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    function populateLinksList() {
        const listContainer = document.getElementById('reorder-links-list');
        if (!listContainer) return;
        
        if (!currentTab) {
            listContainer.innerHTML = '<p>No tab selected</p>';
            return;
        }
        
        listContainer.innerHTML = '';

        currentTab.links.forEach((link, index) => {
            const linkItem = document.createElement('div');
            linkItem.className = 'reorder-link-item';
            
            // Determine link type for display
            let linkType = 'Link';
            let linkName = link.title || 'Unnamed Link';
            
            if (link.type === 'multi') {
                linkType = 'Multi-Link Card';
                linkName = link.cardName || 'Unnamed Card';
            } else if (link.type === 'search') {
                linkType = 'Search Link';
            }
            
            linkItem.innerHTML = `
                <div class="reorder-link-handle">
                    <i class="fas fa-grip-vertical"></i>
                </div>
                <div class="reorder-link-info">
                    <div class="reorder-link-name">${linkName}</div>
                    <div class="reorder-link-type">${linkType}</div>
                </div>
                <div class="reorder-link-actions">
                    <button class="move-up-btn" ${index === 0 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <button class="move-down-btn" ${index === currentTab.links.length - 1 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            `;

            const moveUpBtn = linkItem.querySelector('.move-up-btn');
            const moveDownBtn = linkItem.querySelector('.move-down-btn');

            moveUpBtn.addEventListener('click', () => {
                if (index > 0) {
                    const temp = currentTab.links[index];
                    currentTab.links[index] = currentTab.links[index - 1];
                    currentTab.links[index - 1] = temp;
                    populateLinksList();
                }
            });

            moveDownBtn.addEventListener('click', () => {
                if (index < currentTab.links.length - 1) {
                    const temp = currentTab.links[index];
                    currentTab.links[index] = currentTab.links[index + 1];
                    currentTab.links[index + 1] = temp;
                    populateLinksList();
                }
            });

            listContainer.appendChild(linkItem);
        });
    }

    // To this:
    function saveOrder() {
        saveWorkbooks();
        // Re-render the current tab to show the updated order immediately
        if (currentTab) {
            selectTab(currentTab);
        }
        hideModal();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReorderLinksModal);
    } else {
        initReorderLinksModal();
    }

    // Export to global scope
    window.openReorderLinksModal = showModal;

})();