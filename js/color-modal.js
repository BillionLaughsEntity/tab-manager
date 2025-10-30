// js/color-modal.js
class ColorModal {
    constructor() {
        this.modal = null;
        this.selectedColor = '#3498db';
        this.profileForColor = null;
        this.createModal();
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'color-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Choose Profile Color</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="color-picker-container">
                    <label for="html5-color-picker">Choose a color:</label>
                    <input type="color" id="html5-color-picker" value="${this.selectedColor}" class="html5-color-input">
                    <div class="selected-color-preview">
                        Selected: <span id="selected-color-hex">${this.selectedColor}</span>
                        <div class="color-preview-box" id="color-preview-box" style="background-color: ${this.selectedColor};"></div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-color-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-color-btn">Save Color</button>
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

        this.modal.querySelector('#close-color-modal').addEventListener('click', () => {
            this.hide();
        });

        // Color picker change
        this.modal.querySelector('#html5-color-picker').addEventListener('input', (e) => {
            this.selectedColor = e.target.value;
            this.updateColorPreview();
        });

        // Save color
        this.modal.querySelector('#save-color-btn').addEventListener('click', () => {
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
        const hexSpan = this.modal.querySelector('#selected-color-hex');
        const previewBox = this.modal.querySelector('#color-preview-box');
        
        hexSpan.textContent = this.selectedColor;
        previewBox.style.backgroundColor = this.selectedColor;
    }

    show(profileId, currentColor = '#3498db') {
        this.profileForColor = profileId;
        this.selectedColor = currentColor;

        // Update modal with current values
        const colorPicker = this.modal.querySelector('#html5-color-picker');
        colorPicker.value = currentColor;
        this.updateColorPreview();

        this.modal.style.display = 'block';
    }

    hide() {
        this.modal.style.display = 'none';
    }

    saveColor() {
        if (this.profileForColor && typeof updateProfileColor === 'function') {
            updateProfileColor(this.profileForColor, this.selectedColor);
            this.hide();
        }
    }
}

// Global instance - stays in this file
const colorModal = new ColorModal();

// Replace the existing openColorModal function
function openColorModal(profileId, currentColor) {
    colorModal.show(profileId, currentColor);
}