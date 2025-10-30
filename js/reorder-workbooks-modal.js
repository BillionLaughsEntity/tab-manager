// js/reorder-workbooks-modal.js
function openReorderWorkbooksModal() {
    const modal = document.getElementById('reorder-workbooks-modal');
    if (!modal) {
        createReorderWorkbooksModal();
    }
    showReorderWorkbooksModal();
}

function createReorderWorkbooksModal() {
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
    setupReorderWorkbooksModalListeners();
}

function setupReorderWorkbooksModalListeners() {
    const modal = document.getElementById('reorder-workbooks-modal');
    if (!modal) return;

    // Close modal events
    modal.querySelector('.close-modal').addEventListener('click', () => {
        hideReorderWorkbooksModal();
    });

    modal.querySelector('#close-reorder-workbooks-modal').addEventListener('click', () => {
        hideReorderWorkbooksModal();
    });

    // Save reorder
    modal.querySelector('#save-reorder-workbooks-btn').addEventListener('click', () => {
        saveReorderWorkbooksOrder();
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideReorderWorkbooksModal();
        }
    });
}

function showReorderWorkbooksModal() {
    const modal = document.getElementById('reorder-workbooks-modal');
    if (modal) {
        populateWorkbooksList();
        modal.style.display = 'flex';
    }
}

function hideReorderWorkbooksModal() {
    const modal = document.getElementById('reorder-workbooks-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function populateWorkbooksList() {
    const listContainer = document.getElementById('reorder-workbooks-list');
    if (!listContainer) return;
    
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
            moveWorkbookUpInReorder(index);
        });

        moveDownBtn.addEventListener('click', () => {
            moveWorkbookDownInReorder(index);
        });

        listContainer.appendChild(workbookItem);
    });
}

function moveWorkbookUpInReorder(index) {
    if (index > 0) {
        const temp = workbooks[index];
        workbooks[index] = workbooks[index - 1];
        workbooks[index - 1] = temp;
        populateWorkbooksList();
    }
}

function moveWorkbookDownInReorder(index) {
    if (index < workbooks.length - 1) {
        const temp = workbooks[index];
        workbooks[index] = workbooks[index + 1];
        workbooks[index + 1] = temp;
        populateWorkbooksList();
    }
}

function saveReorderWorkbooksOrder() {
    saveWorkbooks();
    renderWorkbookTabs();
    hideReorderWorkbooksModal();
}