// js/workbook-color-modal.js
class WorkbookColorModal {
    constructor() {
        this.modal = null;
        this.selectedColor = '#9b59b6';
        this.workbookForColor = null;
        this.createModal();
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'workbook-color-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="modal-content color-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Choose Workbook Color</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="color-picker-container">
                    <label for="workbook-html5-color-picker">Choose a color:</label>
                    <input type="color" id="workbook-html5-color-picker" value="${this.selectedColor}" class="html5-color-input">
                    <div class="selected-color-preview">
                        Selected: <span id="workbook-selected-color-hex">${this.selectedColor}</span>
                        <div class="color-preview-box" id="workbook-color-preview-box" style="background-color: ${this.selectedColor};"></div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-workbook-color-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-workbook-color-btn">Save Color</button>
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

        this.modal.querySelector('#close-workbook-color-modal').addEventListener('click', () => {
            this.hide();
        });

        // Color picker change
        this.modal.querySelector('#workbook-html5-color-picker').addEventListener('input', (e) => {
            this.selectedColor = e.target.value;
            this.updateColorPreview();
        });

        // Save color
        this.modal.querySelector('#save-workbook-color-btn').addEventListener('click', () => {
            this.saveColor();
        });

        // Close on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });
    }

    updateColorPreview() {
        const hexSpan = this.modal.querySelector('#workbook-selected-color-hex');
        const previewBox = this.modal.querySelector('#workbook-color-preview-box');
        
        hexSpan.textContent = this.selectedColor;
        previewBox.style.backgroundColor = this.selectedColor;
    }

    show(workbook, currentColor = '#9b59b6') {
        this.workbookForColor = workbook;
        this.selectedColor = currentColor;

        // Update modal with current values
        const colorPicker = this.modal.querySelector('#workbook-html5-color-picker');
        colorPicker.value = currentColor;
        this.updateColorPreview();

        this.modal.style.display = 'block'; // Change to 'block' for consistency
    }

    hide() {
        this.modal.style.display = 'none';
    }

    saveColor() {
        if (this.workbookForColor && typeof updateWorkbookColor === 'function') {
            updateWorkbookColor(this.workbookForColor, this.selectedColor);
            this.hide();
        }
    }
}

// Global instance
const workbookColorModal = new WorkbookColorModal();

// Replace the existing openWorkbookColorModal function
function openWorkbookColorModal(workbook) {
    workbookColorModal.show(workbook, workbook.color);
}