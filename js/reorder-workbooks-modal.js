// js/reorder-workbooks-modal.js
class ReorderWorkbooksModal {
    constructor() {
        this.modal = null;
        this.createModal();
    }

    createModal() {
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
        this.modal = modal;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close modal events
        this.modal.querySelector('.close-modal').addEventListener('click', () => {
            this.hide();
        });

        this.modal.querySelector('#close-reorder-workbooks-modal').addEventListener('click', () => {
            this.hide();
        });

        // Save reorder
        this.modal.querySelector('#save-reorder-workbooks-btn').addEventListener('click', () => {
            this.saveOrder();
        });

        // Close on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });
    }

    show() {
        this.populateWorkbooksList();
        this.modal.style.display = 'flex';
    }

    hide() {
        this.modal.style.display = 'none';
    }

    populateWorkbooksList() {
        const listContainer = this.modal.querySelector('#reorder-workbooks-list');
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

            // Add move up/down event listeners
            const moveUpBtn = workbookItem.querySelector('.move-up-btn');
            const moveDownBtn = workbookItem.querySelector('.move-down-btn');

            moveUpBtn.addEventListener('click', () => {
                this.moveWorkbookUp(index);
            });

            moveDownBtn.addEventListener('click', () => {
                this.moveWorkbookDown(index);
            });

            listContainer.appendChild(workbookItem);
        });
    }

    moveWorkbookUp(index) {
        if (index > 0) {
            const temp = workbooks[index];
            workbooks[index] = workbooks[index - 1];
            workbooks[index - 1] = temp;
            this.populateWorkbooksList();
        }
    }

    moveWorkbookDown(index) {
        if (index < workbooks.length - 1) {
            const temp = workbooks[index];
            workbooks[index] = workbooks[index + 1];
            workbooks[index + 1] = temp;
            this.populateWorkbooksList();
        }
    }

    saveOrder() {
        saveWorkbooks();
        renderWorkbookTabs();
        this.hide();
    }
}

// Global instance
const reorderWorkbooksModal = new ReorderWorkbooksModal();

// Replace the existing openReorderWorkbooksModal function
function openReorderWorkbooksModal() {
    reorderWorkbooksModal.show();
}