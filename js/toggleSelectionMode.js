// js/toggleSelectionMode.js

function toggleSelectionMode() {
    isSelectionMode = !isSelectionMode;
    console.log('Selection mode:', isSelectionMode);
    
    const toggleBtn = document.getElementById('toggle-selection-mode-btn');
    const bulkActionBar = document.getElementById('bulk-action-bar');
    
    if (isSelectionMode) {
        // Enter selection mode
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-times"></i>Cancel Selection';
            toggleBtn.style.background = '#e74c3c';
        }
        
        if (bulkActionBar) {
            bulkActionBar.style.display = 'flex';
        }
        
        // Add checkboxes to all links
        addCheckboxesToLinks();
        
        // Show selection instructions
        showSelectionInstructions();
        
    } else {
        // Exit selection mode
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-check-square"></i>Select Links';
            toggleBtn.style.background = '';
        }
        
        if (bulkActionBar) {
            bulkActionBar.style.display = 'none';
        }
        
        // Remove checkboxes and clear selection
        removeCheckboxesFromLinks();
        selectedLinks.clear();
        updateBulkSelectionCount();
        
        // Remove selection styles
        document.querySelectorAll('.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Hide instructions
        hideSelectionInstructions();
    }
}

function showSelectionInstructions() {
    // Create or show selection instructions
    let instructions = document.getElementById('selection-instructions');
    if (!instructions) {
        instructions = document.createElement('div');
        instructions.id = 'selection-instructions';
        instructions.className = 'selection-instructions';
        instructions.innerHTML = `
            <div class="instructions-content">
                <i class="fas fa-mouse-pointer"></i>
                <span>Click on links to select them. Use the bulk action bar below to perform actions on selected links.</span>
            </div>
        `;
        
        const linksContainer = document.querySelector('.links-container');
        if (linksContainer) {
            linksContainer.insertBefore(instructions, linksContainer.firstChild);
        }
    }
    instructions.style.display = 'block';
}

function hideSelectionInstructions() {
    const instructions = document.getElementById('selection-instructions');
    if (instructions) {
        instructions.style.display = 'none';
    }
}