// js/tree-modal-system.js

// Unified tree modal system for all move operations
class TreeModalSystem {
    constructor() {
        this.selectedItem = null;
        this.modalType = null;
    }

    // Initialize the modal system
    init() {
        this.createModal();
        this.setupEventListeners();
    }

    // Create the modal structure
    createModal() {
        if (document.getElementById('tree-modal')) return;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'tree-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="tree-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="tree-modal-title">Move Item</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <p id="tree-modal-description">Select a destination:</p>
                
                <!-- Destination path display -->
                <div class="selected-destination-path" id="tree-modal-destination-path" style="display: none;">
                    <!-- Selected path will be shown here -->
                </div>
                
                <div class="tree-modal-destinations" id="tree-modal-destinations">
                    <!-- Tree structure will be populated here -->
                </div>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-tree-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-tree-modal">Move</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // Setup event listeners
    setupEventListeners() {
        const modal = document.getElementById('tree-modal');
        if (!modal) return;

        modal.querySelector('.close-modal').addEventListener('click', () => this.hide());
        modal.querySelector('#close-tree-modal').addEventListener('click', () => this.hide());
        modal.querySelector('#save-tree-modal').addEventListener('click', () => this.save());

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hide();
            }
        });
    }

    // Show modal for specific type
    show(type, item, options = {}) {
        this.modalType = type;
        this.selectedItem = item;
        this.options = options;

        const modal = document.getElementById('tree-modal');
        if (!modal) return;

        // Set modal title and description based on type
        this.setModalText(type, options);

        // Populate tree based on type
        this.populateTree(type, item, options);

        modal.style.display = 'flex';
    }

    // Hide modal
    hide() {
        const modal = document.getElementById('tree-modal');
        if (modal) {
            modal.style.display = 'none';
            this.selectedItem = null;
            this.modalType = null;
            this.selectedDestination = null;
            
            const pathElement = document.getElementById('tree-modal-destination-path');
            if (pathElement) {
                pathElement.style.display = 'none';
                pathElement.innerHTML = '';
            }
        }
    }

    // Set modal text based on type
    setModalText(type, options) {
        const titleElement = document.getElementById('tree-modal-title');
        const descriptionElement = document.getElementById('tree-modal-description');

        const texts = {
            'move-tab': {
                title: 'Move Tab',
                description: 'Select a destination environment for this tab:'
            },
            'move-link': {
                title: 'Move Link',
                description: 'Select a destination tab for this link:'
            },
            'move-environment': {
                title: 'Move Environment',
                description: 'Select a destination profile for this environment:'
            },
            'move-profile': {
                title: 'Move Profile',
                description: 'Select a destination workbook for this profile:'
            },
            'clone-links': {
                title: 'Clone Links',
                description: 'Select a destination tab for the cloned links:'
            }
        };

        const textConfig = texts[type] || { title: 'Move Item', description: 'Select a destination:' };
        
        if (titleElement) titleElement.textContent = textConfig.title;
        if (descriptionElement) descriptionElement.textContent = textConfig.description;
    }

    // Populate tree based on type
    populateTree(type, item, options) {
        const container = document.getElementById('tree-modal-destinations');
        if (!container) return;

        container.innerHTML = '';

        const workbooks = window.getTabManagerWorkbooks ? window.getTabManagerWorkbooks() : [];
        
        if (!workbooks || workbooks.length === 0) {
            container.innerHTML = '<div class="no-destinations">No data available</div>';
            return;
        }

        switch (type) {
            case 'move-tab':
                this.populateMoveTabTree(workbooks, item);
                break;
            case 'move-link':
                this.populateMoveLinkTree(workbooks, item);
                break;
            case 'move-environment':
                this.populateMoveEnvironmentTree(workbooks, item);
                break;
            case 'move-profile':
                this.populateMoveProfileTree(workbooks, item);
                break;
            case 'clone-links':
                this.populateCloneLinksTree(workbooks, options?.links || []);
                break;
        }
    }

    // Specific tree population methods for each type
    populateMoveTabTree(workbooks, tab) {
        // Implementation similar to move-tab-modal.js
        const container = document.getElementById('tree-modal-destinations');
        const currentEnvironment = this.findEnvironmentContainingTab(tab, workbooks);
        
        workbooks.forEach(workbook => {
            const workbookItem = this.createWorkbookTreeItem(workbook, currentEnvironment, 'environment');
            if (workbookItem) {
                container.appendChild(workbookItem);
            }
        });
    }

    populateMoveLinkTree(workbooks, link) {
        // Implementation for move link tree
        const container = document.getElementById('tree-modal-destinations');
        
        workbooks.forEach(workbook => {
            const workbookItem = this.createWorkbookTreeItem(workbook, null, 'tab');
            if (workbookItem) {
                container.appendChild(workbookItem);
            }
        });
    }

    // ... other population methods

    // Save action
    save() {
        if (!this.selectedDestination) {
            alert('Please select a destination');
            return;
        }

        // Call the appropriate move function based on modal type
        switch (this.modalType) {
            case 'move-tab':
                if (typeof window.moveTab === 'function') {
                    window.moveTab(this.selectedItem, this.selectedDestination);
                }
                break;
            case 'move-link':
                if (typeof window.moveLink === 'function') {
                    window.moveLink(this.selectedItem, this.selectedDestination);
                }
                break;
            // ... other cases
        }

        this.hide();
    }

    // Helper methods for tree creation (similar to move-tab-modal.js)
    createWorkbookTreeItem(workbook, currentItem, targetType) {
        // Implementation similar to previous tree creation
        // This would create the workbook → profile → environment/tab tree structure
    }

    findEnvironmentContainingTab(tab, workbooks) {
        // Implementation from move-tab-modal.js
    }
}

// Create global instance
window.treeModalSystem = new TreeModalSystem();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.treeModalSystem.init());
} else {
    window.treeModalSystem.init();
}