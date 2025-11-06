/**
 * Trash Bin Modal - Creates and manages the trash bin modal
 */

function createTrashBinModal() {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'trash-bin-modal';
    modal.style.display = 'none';
    
    // Create modal content
    modal.innerHTML = `
        <div class="trash-bin-modal-content">
            <div class="trash-bin-header">
                <h3 class="modal-title">Trash Bin</h3>
                <span class="close-modal">&times;</span>
            </div>
            <div class="trash-bin-count" id="trash-bin-count">0 items in trash</div>
            <div id="trash-bin-items">
                <!-- Trash bin items will be populated here -->
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" id="close-trash-bin-modal">Close</button>
                <button class="modal-btn trash-bin-clear-all-btn" id="clear-trash-bin-btn">
                    <i class="fas fa-trash"></i>Empty Trash Bin
                </button>
            </div>
        </div>
    `;
    
    // Add to document body
    document.body.appendChild(modal);
    
    return modal;
}

/**
 * Initialize Trash Bin Modal
 */
function initTrashBinModal() {
    // Create the modal if it doesn't exist
    let modal = document.getElementById('trash-bin-modal');
    if (!modal) {
        modal = createTrashBinModal();
    }
    
    // Setup event listeners for the modal
    setupTrashBinModalListeners();
    
    return modal;
}

/**
 * Setup event listeners for Trash Bin Modal
 */
function setupTrashBinModalListeners() {
    const modal = document.getElementById('trash-bin-modal');
    if (!modal) return;
    
    // Close modal events
    const closeBtn = modal.querySelector('.close-modal');
    const closeModalBtn = modal.querySelector('#close-trash-bin-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeTrashBinModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeTrashBinModal);
    }
    
    // Clear trash bin button
    const clearBtn = modal.querySelector('#clear-trash-bin-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearTrashBin);
    }
}

/**
 * Open Trash Bin Modal
 */
function openTrashBinModal() {
    const modal = document.getElementById('trash-bin-modal');
    if (!modal) {
        console.error('Trash bin modal not found');
        return;
    }
    
    // Render trash bin content
    renderTrashBinModal();
    
    // Show modal
    modal.style.display = 'flex';
}

/**
 * Close Trash Bin Modal
 */
function closeTrashBinModal() {
    const modal = document.getElementById('trash-bin-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Make functions globally available
window.createTrashBinModal = createTrashBinModal;
window.initTrashBinModal = initTrashBinModal;
window.openTrashBinModal = openTrashBinModal;
window.closeTrashBinModal = closeTrashBinModal;